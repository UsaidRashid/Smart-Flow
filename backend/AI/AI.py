import json
import sys
import torch
from pathlib import Path
import cv2


try:
  model = torch.hub.load('ultralytics/yolov5', 'yolov5l', trust_repo=True)

  def detect_vehicles(image_path):
    script_dir = Path(__file__).parent  # Get parent directory of the script
    image_path = Path(script_dir, '../images', image_path)  # Join with image path

    image = cv2.imread(image_path)
    
    results = model(image)
    
    detections = results.pandas().xyxy[0] 
    vehicle_count = detections[detections['name'].isin(['car', 'bus', 'truck', 'motorcycle'])].shape[0]
    
    return vehicle_count


  if __name__ == '__main__':
    if len(sys.argv) != 2:
      print('Usage: python ai_script.py <image_path>')
      exit(1)
    image_path = sys.argv[1]
    vehicle_count = detect_vehicles(image_path)

    print(json.dumps({'vehicle count': vehicle_count}))
except Exception as e:
  print("Error occurred in Python script:", e)
  sys.exit(1)