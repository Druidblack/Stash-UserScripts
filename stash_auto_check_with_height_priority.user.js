// ==UserScript==
// @name         Stash Auto-Check With Height Priority
// @namespace    https://github.com/Druidblack/Stash-UserScripts
// @version      1.0
// @author       Druidblack
// @description  Selects duplicates preserving user-selected codec, height priority, and bitrate priorities; bitrate applies only when resolution & codec identical
// @match        http://*:9999/*
// @grant        none
//
// @downloadURL  https://github.com/Druidblack/Stash-UserScripts/raw/main/stash_auto_check_with_height_priority.user.js
// @updateURL    https://github.com/Druidblack/Stash-UserScripts/raw/main/stash_auto_check_with_height_priority.user.js
// ==/UserScript==

(function(){
    'use strict';

    function scanAndCheck(){
        const priorityRes = document.getElementById('priority-res-select')?.value;
        const priorityCodec = document.getElementById('priority-codec-select')?.value?.toLowerCase();
        const priorityBit = document.getElementById('priority-bitrate-select')?.value;
        const tbody = document.querySelector('tbody'); if(!tbody) return;

        // extract selected height from resolution (after 'x')
        const selectedHeight = priorityRes?.split('x')[1] || null;

        const rows = Array.from(tbody.querySelectorAll('tr'));
        const groups = [];
        let curr = [];
        rows.forEach(r=>{
            if(r.classList.contains('separator')){ if(curr.length) groups.push(curr); curr = []; }
            else curr.push(r);
        });
        if(curr.length) groups.push(curr);

        groups.forEach(group=>{
            // build entries
            const entries = group.map(row=>{
                const cells = row.querySelectorAll('td');
                const res = cells[6]?.textContent.trim()||'';
                const [wStr,hStr] = res.split('x');
                const area = wStr && hStr ? parseInt(wStr,10)*parseInt(hStr,10) : 0;
                const codec = cells[8]?.textContent.trim().toLowerCase()||'';
                const brText = cells[7]?.textContent.trim()||'';
                const brVal = parseFloat(brText.replace(/\u00A0|\s|mbps/g,'').replace(',','.'))||0;
                const checkbox = row.querySelector('input.form-check-input');
                return {row, res, height: hStr, area, codec, brVal, checkbox};
            });

            // 1) Bitrate priority when same resolution & same codec
            const allSameRes = entries.every(e=>e.res===entries[0].res);
            const allSameCodec = entries.every(e=>e.codec===entries[0].codec);
            if(allSameRes && allSameCodec && priorityBit){
                let target = entries[0];
                entries.forEach(e=>{
                    if(priorityBit==='max' ? e.brVal>target.brVal : e.brVal<target.brVal) target = e;
                });
                entries.forEach(e=>{
                    if(!e.checkbox) return;
                    const shouldSelect = e!==target;
                    if(e.checkbox.checked!==shouldSelect) e.checkbox.click();
                });
                return;
            }

            // 2) Height priority: match entries by height when differentiates group
            if(selectedHeight){
                const matchHeight = entries.filter(e=> e.height===selectedHeight);
                if(matchHeight.length>0 && matchHeight.length<entries.length){
                    entries.forEach(e=>{
                        if(!e.checkbox) return;
                        const shouldSelect = e.height!==selectedHeight;
                        if(e.checkbox.checked!==shouldSelect) e.checkbox.click();
                    });
                    return;
                }
            }

            // 3) Codec priority when differentiates
            if(priorityCodec){
                const matchCodec = entries.filter(e=> e.codec===priorityCodec);
                if(matchCodec.length>0 && matchCodec.length<entries.length){
                    entries.forEach(e=>{
                        if(!e.checkbox) return;
                        const shouldSelect = e.codec!==priorityCodec;
                        if(e.checkbox.checked!==shouldSelect) e.checkbox.click();
                    });
                    return;
                }
            }

            // 4) Standard 1080p fallback (height='1080')
            const std1080 = entries.filter(e=> e.height==='1080');
            if(std1080.length>0){
                entries.forEach(e=>{
                    if(!e.checkbox) return;
                    const shouldSelect = e.height!=='1080';
                    if(e.checkbox.checked!==shouldSelect) e.checkbox.click();
                });
                return;
            }

            // 5) Highest area fallback
            let maxE = entries[0]; entries.forEach(e=>{ if(e.area>maxE.area) maxE=e; });
            entries.forEach(e=>{
                if(!e.checkbox) return;
                const shouldSelect = e!==maxE;
                if(e.checkbox.checked!==shouldSelect) e.checkbox.click();
            });
        });
    }

    function styleSelect(sel){
        sel.style.backgroundColor = '#000';
        sel.style.color = '#fff';
        sel.style.marginLeft = '8px';
        sel.style.padding = '4px 12px';
        sel.style.minWidth = '140px';
    }

    function buildResolutionDropdown(){
        if(document.getElementById('priority-res-select')) return;
        const tbody = document.querySelector('tbody'); if(!tbody) return;
        const set = new Set();
        tbody.querySelectorAll('tr').forEach(r=>{
            if(r.classList.contains('separator')) return;
            const res = r.querySelectorAll('td')[6]?.textContent.trim();
            if(res) set.add(res);
        });
        const arr = Array.from(set).sort((a,b)=>{
            const ha = parseInt(a.split('x')[1],10);
            const hb = parseInt(b.split('x')[1],10);
            return hb - ha;
        });
        const sel = document.createElement('select'); sel.id='priority-res-select'; sel.className='form-select'; styleSelect(sel);
        arr.forEach(v=> sel.append(new Option(v,v)));
        document.getElementById('start-search')?.after(sel);
    }

    function buildCodecDropdown(){
        if(document.getElementById('priority-codec-select')) return;
        const tbody = document.querySelector('tbody'); if(!tbody) return;
        const set = new Set();
        tbody.querySelectorAll('tr').forEach(r=>{
            if(r.classList.contains('separator')) return;
            const codec = r.querySelectorAll('td')[8]?.textContent.trim().toLowerCase();
            if(codec) set.add(codec);
        });
        const arr = Array.from(set).sort();
        const sel = document.createElement('select'); sel.id='priority-codec-select'; sel.className='form-select'; styleSelect(sel);
        arr.forEach(v=> sel.append(new Option(v,v)));
        document.getElementById('priority-res-select')?.after(sel);
    }

    function buildBitrateDropdown(){
        if(document.getElementById('priority-bitrate-select')) return;
        const sel = document.createElement('select'); sel.id='priority-bitrate-select'; sel.className='form-select'; styleSelect(sel);
        sel.append(new Option('max bit','max'), new Option('min bit','min'));
        document.getElementById('priority-codec-select')?.after(sel);
    }

    function insertControls(){
        const btn = document.querySelector('div.row.no-gutters div.col-12 div.dropdown > button.dropdown-toggle.btn.btn-secondary');
        if(!btn || document.getElementById('start-search')) return;
        const start = document.createElement('button');
        start.id='start-search'; start.type='button'; start.className='btn btn-primary';
        start.textContent='Search'; styleSelect(start);
        start.style.minWidth = 'auto';
        start.addEventListener('click', scanAndCheck);
        btn.after(start);
        buildResolutionDropdown(); buildCodecDropdown(); buildBitrateDropdown();
    }

    window.addEventListener('load', insertControls);
    new MutationObserver(insertControls).observe(document.body, { childList: true, subtree: true });
})();
