get_disk_info() {
    df -h | awk '{print "{\"filesystem\": \"" $1 "\", \"size\": \"" $2 "\", \"used\": \"" $3 "\", \"available\": \"" $4 "\", \"use_percentage\": \"" $5 "\", \"mounted_on\": \"" $6 "\"},"}'
}

send_data() {
    local url="$1"
    local data="$2"
    curl -X POST -H "Content-Type: application/json" -d "[$data]" "$url"
}

url="http://example.com/post"

disk_info=$(get_disk_info)

echo "$disk_info"

send_data "$url" "$disk_info"
