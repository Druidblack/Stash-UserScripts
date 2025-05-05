# Stash-UserScripts
![stash](https://github.com/Druidblack/Stash-UserScripts/blob/main/add/24867471.jpg)

Collection of my MusicBrainz Userscripts

## Installing

To use these userscripts, you need a userscript add-on or extension such as [Tampermonkey](https://www.tampermonkey.net/), [Violentmonkey](https://violentmonkey.github.io/), or [Greasemonkey](https://addons.mozilla.org/en-GB/firefox/addon/greasemonkey/) installed in your browser. More information can be found [here](https://stackapps.com/tags/script/info), [here](https://openuserjs.org/about/Userscript-Beginners-HOWTO), or [here](https://userscripts-mirror.org/about/installing.html).

## Configuration
The @match config is only needed for userscripts: Change the // @match        http://localhost:9999/* in the script header to match your server address and port.

## Stash Auto-Check With Height Priority
![1](https://github.com/Druidblack/Stash-UserScripts/blob/main/add/prim.jpg)

With one click, it selects duplicates other than the one you selected in the settings by parameters.

The script works in several stages. The script receives data about the video resolution and the codecs used when the page loads. Later, when navigating through the pages, the script can use previously received data, or you can update the page and the script will receive new data.
The script checks video resolutions based on the frame height. If you have videos that differ slightly in frame width, the script will still perceive them as having the same resolution.

The script checks the video characteristics in several stages. 

1. Checks the video resolution. In this case, it leaves the video resolution that you specified by marking the rest for deletion.

2. If the videos have the same resolution, but the script will check which codec is selected as the priority.

3. If the videos are completely identical in resolution and codec, the script will select the video by the minimum or maximum bitrate.

4. If the videos are completely identical, the script will leave the first video in the group.

[![Source](https://github.com/Druidblack/MusicBrainz-UserScripts/blob/main/add/Source-button.png)](https://github.com/Druidblack/Stash-UserScripts/blob/main/stash_auto_check_with_height_priority.user.js)
[![Install](https://github.com/Druidblack/MusicBrainz-UserScripts/blob/main/add/Install-button.png)](https://github.com/Druidblack/Stash-UserScripts/raw/main/stash_auto_check_with_height_priority.user.js)

## Stash Blur
![2](https://github.com/Druidblack/Stash-UserScripts/blob/main/add/anim.gif)

Adds an on/off blurring button to the application page and a slider to display the degree of blurring.

[![Source](https://github.com/Druidblack/MusicBrainz-UserScripts/blob/main/add/Source-button.png)](https://github.com/Druidblack/Stash-UserScripts/blob/main/stash_blur.user.js)
[![Install](https://github.com/Druidblack/MusicBrainz-UserScripts/blob/main/add/Install-button.png)](https://github.com/Druidblack/Stash-UserScripts/raw/main/stash_blur.user.js)

## Auto Delete File Button Clicker for Stash

![3](https://github.com/Druidblack/Stash-UserScripts/blob/main/add/444.jpg)

If the video has a Scene in which several videos are combined, the script will prompt you to delete one of the files immediately (you do not need to navigate through the menu). This script was needed to simplify the deletion of identical videos, which stash combined into one scene and did not show them when searching for duplicates.

[![Source](https://github.com/Druidblack/MusicBrainz-UserScripts/blob/main/add/Source-button.png)](https://github.com/Druidblack/Stash-UserScripts/blob/main/button_clicker.user.js)
[![Install](https://github.com/Druidblack/MusicBrainz-UserScripts/blob/main/add/Install-button.png)](https://github.com/Druidblack/Stash-UserScripts/raw/main/button_clicker.user.js)

## Auto-check “Delete file”

![4](https://github.com/Druidblack/Stash-UserScripts/blob/main/add/555.jpg)

Automatically ticks the box "Delete file (along with funscript)"

[![Source](https://github.com/Druidblack/MusicBrainz-UserScripts/blob/main/add/Source-button.png)](https://github.com/Druidblack/Stash-UserScripts/blob/main/stash_check_delete_file.user.js)
[![Install](https://github.com/Druidblack/MusicBrainz-UserScripts/blob/main/add/Install-button.png)](https://github.com/Druidblack/Stash-UserScripts/raw/main/stash_check_delete_file.user.js)
