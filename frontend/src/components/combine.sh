#!/bin/bash

# Ensure an output file name is provided
if [ "$#" -lt 2 ]; then
    echo "Usage: $0 output_file.txt input_file1 [input_file2 ...]"
    exit 1
fi

output_file="$1"
shift  # Removes the first argument, leaving only the file names

# Clear the output file if it exists
> "$output_file"

# Loop through each file and append its name and contents to the output file
for file in "$@"; do
    echo "[${file}]" >> "$output_file"
    cat "$file" >> "$output_file"
    echo -e "\n" >> "$output_file"  # Add a newline for separation
done

echo "Contents combined in $output_file"
