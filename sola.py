import random
import xml.etree.ElementTree as ET #built in kniznca za brat xml datoteke

SVG_FILE = r"C:\Users\User\Downloads\sola_edited.svg"  #path sm dou jst svoj, za projekt je en taprav

def load_classrooms(svg_file):
    tree = ET.parse(svg_file) #prebere datoteko svg (zabelez jo zacasno v tree)
    root = tree.getroot() #prebere: svg iz tree

    ns = {"svg": "http://www.w3.org/2000/svg"}

    classrooms = []

    # THIS is where we search for SVG <path> elements
    for path in root.findall(".//svg:path", ns): #pogleda povsod v ns za path(/.//svg:path)
        if path.get("class") == "classroom": #ce najde da ma path, class
            classrooms.append({
                "name": path.get("class-data"),
                "d": path.get("d"),
                "id": path.get("id")
            })

    return classrooms


def random_ucilnica(classrooms):
    return random.choice(classrooms)


if __name__ == "__main__":
    classrooms = load_classrooms(SVG_FILE) #v load_classrooms(svg_file) gre SVG_FILE, poklican mal prej izven def-a

    if not classrooms:
        return
    else:
        chosen = random_ucilnica(classrooms)
        return chosen["name"]
