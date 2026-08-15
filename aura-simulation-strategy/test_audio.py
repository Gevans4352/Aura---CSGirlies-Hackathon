#Baca file audio -> y (data gelombang suara), sr (sample rate)
import librosa
import librosa.display
import matplotlib.pyplot as plt 

y, sr = librosa.load("aura_audio.wav", sr=None)

#tampilkan info dasar audio buat verifikasi
print(f"Sample rate: {sr} Hz")
print(f"Duration: {len(y)/sr:.2f} second")

#gambar & simpan waveform (bentuk gelombang suara)
plt.figure(figsize=(10, 4))
librosa.display.waveshow(y, sr=sr)
plt.title("Waveform - Aura Audio")
plt.savefig("waveform_audio.png")