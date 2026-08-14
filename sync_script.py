import shutil
import os

src_video = r"C:\Users\User\Downloads\Criar_movimento_de_drone_202608141105.mp4"
dir_ayer = r"C:\Users\User\Desktop\Sites\ayer-patricio-imoveis"
dir_tercio = r"C:\Users\User\Desktop\Sites\tercio-mendes-imoveis"

# Ensure assets dir in both
os.makedirs(os.path.join(dir_ayer, "assets"), exist_ok=True)
os.makedirs(os.path.join(dir_tercio, "assets"), exist_ok=True)

# Copy video
if os.path.exists(src_video):
    shutil.copy(src_video, os.path.join(dir_ayer, "assets", "hero-bg-drone.mp4"))
    shutil.copy(src_video, os.path.join(dir_tercio, "assets", "hero-bg-drone.mp4"))
    print("VIDEO_COPIED")
else:
    print("VIDEO_SRC_NOT_FOUND")

# Copy files from tercio to ayer so both are in sync
for fname in ["index.html", "styles.css", "app.js"]:
    src_file = os.path.join(dir_tercio, fname)
    if os.path.exists(src_file):
        shutil.copy(src_file, os.path.join(dir_ayer, fname))

# Copy assets
for root, dirs, files in os.walk(os.path.join(dir_tercio, "assets")):
    for f in files:
        s = os.path.join(root, f)
        rel = os.path.relpath(s, os.path.join(dir_tercio, "assets"))
        d = os.path.join(dir_ayer, "assets", rel)
        os.makedirs(os.path.dirname(d), exist_ok=True)
        shutil.copy(s, d)

print("SYNC_COMPLETE")
