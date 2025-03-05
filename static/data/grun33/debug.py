import open3d as o3d

# Load the point cloud
pcd = o3d.io.read_point_cloud("cleaned_00019329_ascii.ply")
print(f"Point cloud contains {len(pcd.points)} points.")

import numpy as np

points = np.asarray(pcd.points)
if np.any(np.isnan(points)) or np.any(np.isinf(points)):
    print("Found NaN or Inf values!")
else:
    print("No NaN or Inf values detected.")