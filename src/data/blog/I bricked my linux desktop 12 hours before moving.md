---
title: " I bricked my linux desktop 12 hours before moving"
date: January 25, 2026
---

# I bricked my linux desktop 12 hours before moving

I had everything packed. Boxes stacked. Desk cleared. Final semester of college ahead of me~

All I wanted to do was sit down, play some games for a bit, and mentally decompress before moving. Instead, I accidentally bricked my Linux desktop.

It started with something completely reasonable my game wasnt launching right, so I reinstalled my graphics driver. It wasnt on the "recommended" version acording to mint but whatever I thought itd be fine!

Reboot. Linux Mint logo flashed for a second. Then my monitor went no signal. The computer was clearly on. Fans spinning. Lights on. Keyboard lit up. But no video output.

Eventually, after repeated boots, the system began dropping into initramfs. This all happened ~12 hours before moving back to college, so time and patience were... limited...

## Initramfs claims root filesystem doesn’t exist ![Terminal struggles 1](https://files.catbox.moe/jduec4.jpg)

Ok so, it could be a root device name mismatch, kernel arguments incorrect, or system moved to NVMe naming (nvme0n1p2).

![Terminal struggles 2](https://files.catbox.moe/hffhph.png)

The first thing I checked was whether the system could even see my NVMe drive.

It could. The drive and partitions were all there. Whatever was wrong, it wasn’t the hardware.

Here I learned that my NVMe driver loads (at least manually) and my disk absolutely exists. Which is great!

## This should have worked? I think?

![Terminal struggles 3](https://files.catbox.moe/82scq1.png)

Manually mounting the root partition somehow both failed and worked.

/mnt already contained a complete filesystem /etc, /home, /usr... but initramfs still refused to boot from it.

## Chroot & module attempts

I chrooted into the system, manually loaded NVMe modules, confirmed the UUID with blkid, and verified the kernel arguments. Everything checked out at least on paper.

Reboot failure.

The reboot dropped me straight back into initramfs.

## Idek what I was doing here this was my giving up point

![Terminal struggles 3](https://files.catbox.moe/sm16y3.png)

## So… what went wrong?

By this point, I was out of time.

 The disk was there. The filesystem was intact. On paper, everything that should have allowed Linux to boot existed it just refused to come together.

Rebuilding initramfs, regenerating GRUB, loading NVMe modules manually… none of it worked LOL

With boxes already stacked and a long drive ahead of me, I had to stop chasing the “one more fix” that might have worked. Debugging turned into damage control.

The reality is that this will probably end in a reinstall either by me, or by my girlfriend while I hover nervously and swear I wont touch anything this time. Thats a problem for spring break~

Until then, my desktop will be collecting dust back home, and PC gaming is officially on hold. Tragic, truly. The Steam Deck is doing its best, but it just isnt the same especially for Marvel Rivals :eyes-cry: