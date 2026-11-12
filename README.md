# ApexTrace

Tugas 2 menambahkan Nginx sebagai satu-satunya pintu masuk ke aplikasi. Backend
dijalankan sebagai tiga container dan database hanya berada di jaringan internal
Compose.

## Menjalankan

Docker Desktop aktif, lalu jalankan dari root repository:

```bash
docker compose up --build --scale backend=3 -d
```

buka `http://localhost:8080`. buat stop stackny dengan:

```bash
docker compose down
```

`backend` memakai `expose`, bukan `ports`, sehingga port 3000 hanya dapat
dijangkau oleh service lain di jaringan Compose. `db` juga tidak mempublikasikan
port ke host.

# Bukti

Contoh berikut dijalankan setelah `docker compose up --build --scale backend=3 -d`.
Alamat pada `X-Upstream` dapat berbeda urutannya, tetapi harus berganti di antara
tiga alamat container backend.

# Reverse proxy dan load balancing

```text
$ curl -sS -D - http://localhost:8080/api/health -o /dev/null
HTTP/1.1 200 OK
Content-Type: application/json
X-Content-Type-Options: nosniff
X-Upstream: 172.20.0.3:3000

$ curl -sS -D - http://localhost:8080/api/health -o /dev/null
HTTP/1.1 200 OK
Content-Type: application/json
X-Content-Type-Options: nosniff
X-Upstream: 172.20.0.4:3000

$ curl -sS -D - http://localhost:8080/api/health -o /dev/null
HTTP/1.1 200 OK
Content-Type: application/json
X-Content-Type-Options: nosniff
X-Upstream: 172.20.0.5:3000
```

# Rate limit

Route `/api/health` dibatasi `2r/s` dengan burst 2. Request cepat berulang
menghasilkan status 429:

```text
$ for i in $(seq 1 10); do curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8080/api/health; done
200
200
200
200
429
429
429
429
429
429
```

# Header keamanan dan gzip

```text
$ curl --compressed -sS -D - http://localhost:8080/api/health -o /dev/null
HTTP/1.1 200 OK
Content-Type: application/json
Content-Encoding: gzip
X-Content-Type-Options: nosniff
```

# Port backend lama tidak bisa diakses

```text
$ curl --connect-timeout 2 http://localhost:3000/api/health
curl: (7) Failed to connect to localhost port 3000
```

## Jawaban pertanyaan

(a) `zone` menyediakan shared memory utk konfigurasi dan state upstream yang
dipakai breng sm worker Nginx. kl dihapus, konfigurasi upstream statis ini
masih dapat meneruskan request, tp state load balancing tidak dibagi antar
worker dan fitur perubahan upstream secara runtime tidak tersedia.

(b) `limit_req_status 429` memakai status standar “Too Many Requests” yang
jelas bagi client bahwa request ditolak karena rate limit. Bawaan Nginx adalah
503 Service Unavailable, yang terlihat seperti gangguan server, bukan throttling.

(c)** Backend dan database g punya `ports` agar keduanya tidak bisa diakses
langsung dari host dan Nginx menjadi satu-satunya pintu masuk. Nginx menjangkau
backend melalui nama service `backend` dan port internal 3000 pada network
Compose.
