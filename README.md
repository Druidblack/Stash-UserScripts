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
