#Baca audio asli, lalu olah jadi versi "kacau/tegang"
import librosa
import soundfile as sf 
import numpy as np 

y, sr = librosa.load("aura_audio.wav", sr=None)

#1. Naikkan pitch -> kesan suara tegang
y_shifted = librosa.effects.pitch_shift(y, sr=sr, n_steps=3)
#2. Tambah noise acak -> kesan berdesis/static
noise = np.random.normal(0, 0.02, y_shifted.shape)
y_noise = y_shifted + noise
#3. Naikkan volume & potong (clip) -> kesan suara "pecah"
y_distorted = np.clip(y_noise * 1.5, -1.0, 1.0)

#Simpan jadi file audio baru
sf.write("aura_audio_distorted.wav", y_distorted, sr)
print("Done! File saved as aura_audio_distorted.wav")