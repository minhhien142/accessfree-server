# Task 6: Create Nginx Proxy Server to connect to Gitlab
Nginx Proxy Service đóng vai trò là một Proxy đứng trước và nhận mọi traffic từ bên ngoài. Redirect từ port 80 sang 443, xác thực ssl, rồi chuyển hướng sang gitlab.
- Tiến hành tạo Nginx Proxy server bằng docker. Sử dụng image gốc của nginx tại đây: https://hub.docker.com/_/nginx/
- Chỉnh sửa config của nginx ở tập tin nginx/default.conf. Lưu ý một số chỗ sau thay đổi khi cần thiết:
    ```sh
    server_name git.nashtechglobal.com;// đổi domain cần dùng
    
    // chỉnh sửa đường dẫn đến các file cert
    ssl_certificate           /etc/nginx/certs/bundle.crt;
    ssl_certificate_key       /etc/nginx/certs/gitlab.key;
    
    proxy_pass          https://gitlab;// đổi tên theo service trong compose file
    proxy_read_timeout  90;
    proxy_redirect      https://gitlab https://git.nashtechglobal.com;
    ```
- Tiến hành tạo Dockerfile để build image ghi đè file config của mình vào. Chỉnh sửa Dockerfile ở nginx/Dockerfile
- Tiến hành build image nginx proxy ta vào thư mục nginx. Chạy lệnh sau:
    ```sh
    $ docker build -t nashtech/nginx:1.0 .
    ```
- Tiến hành thêm nginx proxy vào file docker-compose.yml như sau:
    ```sh
  nginx-proxy:
    image: nashtech/nginx:latest
    ports:
    - "80:80"
    - "443:443"
    volumes:
    - type: bind
      source: /certs
      target: /etc/nginx/certs
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints:
          - node.hostname == gitlab-node1
    ```