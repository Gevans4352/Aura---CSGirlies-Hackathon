#Fungsi: hitung spectral centroid (ukuran "kecerahan" suara) dari 1 file 
import librosa
import matplotlib.pyplot as plt 
import numpy as np 

def get_centroid(filename):
    y, sr = librosa.load(filename, sr=None)
    centroid = librosa.feature.spectral_centroid(y=y, sr=sr)[0]
    t = librosa.frames_to_time(range(len(centroid)), sr=sr)
    return t, centroid

#Proses kedua file audio
t_calm, c_calm = get_centroid("aura_audio.wav")
t_distorted, c_distorted = get_centroid("aura_audio_distorted.wav")

print(f"Average centroid (calm): {np.mean(c_calm):.2f} Hz")
print(f"Average centroid (distorted): {np.mean(c_distorted):.2f} Hz")

#Gambar 2 grafik berdampingan buat dibandingkan 
fig, axes = plt.subplots(1, 2, figsize=(14, 4), sharey=True)
axes[0].plot(t_calm, c_calm, color='steelblue')
axes[0].set_title("Calm - Spectral Centroid")
axes[1].plot(t_distorted, c_distorted, color='crimson')
axes[1].set_title("Distorted - Spectral Centroid")
plt.tight_layout()
plt.savefig("centroid_comparison.png")
print("Saved: centroid_comparison.png")