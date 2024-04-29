import torch
from pathlib import Path
import cv2

model = torch.hub.load('ultralytics/yolov5', 'yolov5s', trust_repo=True)

def detect_vehicles(image_path):
  # Load image (replace with your image loading logic)
  image = cv2.imread(image_path)
  
  # Perform detection using the model
  results = model(image)
  
  # Access detections and filter for vehicles
  detections = results.pandas().xyxy[0]  # Assuming results.pandas() provides a pandas dataframe
  vehicle_count = detections[detections['name'].isin(['car', 'bus', 'truck', 'motorcycle'])].shape[0]
  
  return vehicle_count

# Example usage
image_path = "your_traffic_image.jpg"
vehicle_count = detect_vehicles(image_path)
print("Total Vehicles Detected:", vehicle_count)