from Classes.ConveyorBelt import ConveyorBelt
from Classes.PhotoSensor import PhotoSensor
from Classes.Printer import Printer
from Classes.Webcam import Webcam
from Classes.YoloServer import YoloServer
from Classes.Scale import Scale
from Classes.API import API

# Setup serial devices
printer = Printer('/dev/ttyUSB1')
photosensor = PhotoSensor('/dev/ttyUSB2')
scale = Scale('/dev/ttyUSB3')

# Setup GPIO devices
conveyorelt = ConveyorBelt(3)

# Setup USB devices
webcam = Webcam(0)

# Setup exeternal services
yoloserver = YoloServer("http://34.90.55.55/upload")
api = API("127.0.0.1:80")

while(True):
    # Start running the conveyerbelt
    conveyorelt.start()
    
    # Keep running until something obstructs the photosensor
    photosensor.wait()

    # Stop the coneyer belt while a component analysis is taken
    conveyorelt.stop()

    # Capture a photo of the component
    capturedphoto = webcam.capture_photo("captured_image.jpg")
    
    # Analyse the image and retrieve whats on it
    component_result = yoloserver.analyse_image(capturedphoto)

    # This code is only for our proof of concept. In a real product, 
    # we would dynamically choose the correct box to sort into based 
    # on the type of component. However, for the purpose of this proof of 
    # concept, we have chosen to use a static approach.

    # Set the printer boxes, so the right box is outside the conveyer belt
    if(component_result == "inductor"):
        printer.setAxis(0)
    elif(component_result == "capactior"):
        printer.setAxis(72)
    else:
        printer.setAxis(144)

    # Start running the conveyerbelt so a component can fall off
    conveyorelt.start()

    # Keep running until something lands on the scale
    scale.wait()

    # Stop the coneyer belt while the components weight is measured
    conveyorelt.stop()

    # Weigh the component
    component_weight = scale.read()

    #Create the component in the API
    api.create_component(component_result, component_weight)