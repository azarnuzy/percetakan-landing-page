#!/usr/bin/env zsh
set -euo pipefail

output_dir="public/optimized"
mkdir -p "$output_dir"

for image in public/*.png; do
  base="${image:t:r}"

  case "$base" in
    contact_customer_service|contact_customer_service_with_bg|logo|logo192|logo512|logo-with-text)
      continue
      ;;
  esac

  sips -s format jpeg -s formatOptions 78 -Z 960 "$image" --out "$output_dir/$base-960.jpg" >/dev/null
  sips -s format jpeg -s formatOptions 76 -Z 640 "$image" --out "$output_dir/$base-640.jpg" >/dev/null
  sips -s format jpeg -s formatOptions 74 -Z 360 "$image" --out "$output_dir/$base-360.jpg" >/dev/null
done

echo "Optimized images written to $output_dir"
