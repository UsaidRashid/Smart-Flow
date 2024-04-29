import torch
from pathlib import Path
import cv2

model = torch.hub.load('ultralytics/yolov5', 'yolov5l', trust_repo=True)

def detect_vehicles(image_path):
  image = cv2.imread(image_path)
  
  results = model(image)
  
  detections = results.pandas().xyxy[0] 
  vehicle_count = detections[detections['name'].isin(['car', 'bus', 'truck', 'motorcycle'])].shape[0]
  
  return vehicle_count

image_path = "your_traffic_image_2.jpg"
vehicle_count = detect_vehicles(image_path)
print("Total Vehicles Detected:", vehicle_count)