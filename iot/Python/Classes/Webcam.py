import cv2

class Webcam:
    def __init__(self, camera_index=0):
        self.camera_index = camera_index
        self.video_capture = cv2.VideoCapture(camera_index)

    def capture_photo(self, file_path):
        ret, frame = self.video_capture.read()
        cv2.imwrite(file_path, frame)
        self.video_capture.release()
        return(file_path)