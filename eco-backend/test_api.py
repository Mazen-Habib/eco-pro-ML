#!/usr/bin/env python3
"""
Test script for the YOLO Image Classification API
Usage: python test_api.py <path_to_image>
"""

import sys
import requests

def test_classify_endpoint(image_path):
    url = 'http://127.0.0.1:8000/api/classify/'
    
    try:
        with open(image_path, 'rb') as image_file:
            files = {'image': image_file}
            response = requests.post(url, files=files)
            
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.json()}")
            
    except FileNotFoundError:
        print(f"Error: Image file not found at {image_path}")
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the API. Make sure the server is running.")
    except Exception as e:
        print(f"Error: {str(e)}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python test_api.py <path_to_image>")
        sys.exit(1)
    
    image_path = sys.argv[1]
    test_classify_endpoint(image_path)
