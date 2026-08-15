#Fungsi: ekstrak pitch (f0) dari 1 file, hitung jitter (ketidakstabilan pitch)
import librosa
import matplotlib.pyplot as plt
import numpy as np

def get_pitch_jitter(filename):
    y, sr = librosa.load(filename, sr=None)
    f0, voice_flag, voice_probs = librosa.pyin(
        y, fmin=librosa.note_to_hz('C2'), fmax=librosa.note_to_hz('C7'), sr=sr
    )
    t = librosa.times_like(f0, sr=sr)
    f0_clean = f0[~np.isnan(f0)]
    #Jitter = rata-rata selisih pitch antar frame, dibagi rata-rata pitch, x100
    diffs = np.abs(np.diff(f0_clean))
    jitter = np.mean(diffs) / np.mean(f0_clean) * 100
    return t, f0, jitter, np.mean(f0_clean)

#Proses kedua file audio
t_calm, f0_calm, jitter_calm, mean_calm = get_pitch_jitter ("aura_audio.wav")
t_distorted, f0_distorted, jitter_distorted, mean_distorted = get_pitch_jitter ("aura_audio_distorted.wav")

print(f"Calm - jitter: {jitter_calm:.2f}%")
print(f"Distorted - jitter: {jitter_distorted:.2f}%")

#Gambar 2 grafik pitch contour berdampingan
fig, axes = plt.subplots(1, 2, figsize=(14, 4))
axes[0].plot(t_calm, f0_calm, color='steelblue')
axes[0].set_title(f" Calm - pitch (Jitter: {jitter_calm:.2f}%)")
axes[1].plot(t_distorted, f0_distorted, color='crimson')
axes[1].set_title(f"Distorted - pitch (Jitter: {jitter_distorted:.2f}%)")
plt.tight_layout()
plt.savefig("jitter_comparison.png")
print("Saved: jitter_comparison.png")