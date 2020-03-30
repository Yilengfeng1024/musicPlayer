       var musicList = []
        var currentIndex = 0
        var clock
        var audio = new Audio()
        audio.autoplay = true 

        function getMusicList(callback) {
            var xhr = new XMLHttpRequest()
            xhr.open('GET','https://yilengfeng1024.github.io/musicPlayer/music.json',true)
            xhr.onload = function() {
                if((xhr.status >=200 && xhr.status < 300) || xhr.status === 304){
                    callback(JSON.parse(this.responseText))
                }else{
                    console.log('获取数据失败')
                }
            }
            xhr.send()
        }

        getMusicList(function(list){
            musicList = list 
            loadMusic(list[currentIndex])
            generateList(list)
        })

        function loadMusic(musicObj) {
            console.log('begin play',musicObj)
            $('.musicbox .title').innerText = musicObj.title
            $('.musicbox .auther').innerText = musicObj.auther
            $('.cover').style.backgroundImage = 'url('+musicObj.img+')'
            audio.src = musicObj.src
        }

        function generateList(list) {

        }

        function $(selector) {
            return document.querySelector(selector)
        }

        audio.ontimeupdate = function() {
            $('.musicbox.progress-now').style.width = (this.currentTime/this.duration)*100 + '%'
        }

        Audio.onpaly = function() {
            clock = setInterval(function(){
                var min = Math.floor(audio.currentTime/60)
                var sec = Math.floor(audio.currentTime)%60 + ''
                sec = sec.length === 2? sec : '0' + sec
                $('.musicbox .time').innerText = min + ':' +sec
            },1000)
        }

        audio.onpause = function() {
            clearInterval(clock)
        }

        audio.onended = function() {
            console.log('end')
            currentIndex = (++currentIndex)%musicList.length
            loadMusic(musicList[currentIndex])
        }

        $('.musicbox .play').onclick = function() {
            if(audio.paused) {
                audio.play()
                this.querySelector('.iconfont').classList.add('icon-kaishi')
                this.querySelector('.iconfont').classList.remove('icon-zanting')
            }else {
                audio.pause()
                this.querySelector('.iconfont').classList.add('icon-zanting')
                this.querySelector('.iconfont').classList.remove('icon-kaishi')
            }
        }

        $('.musicbox .forward').onclick = function() {
            currentIndex = (++currentIndex)%musicList.length
            loadMusic(musicList[currentIndex])
        }

        $('.musicbox .back').onclick = function() {
            currentIndex = (musicList.length + --currentIndex)%musicList.length
            loadMusic(musicList[currentIndex])
        }

        $('.musicbox .bar').onclick = function(e) {
            console.log(e)
            var percent = e.offsetX / parseInt(getComputedStyle(this).width)
            console.log(percent)
            audio.currentTime = audio.duration * percent
        }

        $('.setvolume .volume').onclick = function(e) {
            console.log(e)
            var percent = e.offsetY / parseInt(getComputedStyle(this).height)
            console.log(percent)
            audio.volume = percent
            $('setvolume .volume .vol').style.height = percent*100 + '%'
        }

        $('.music .list').onclick = function(e) {
            if(e.target.tagName.toLowerCase() === 'li'){
        for(var i = 0; i < this.children.length; i++){
          if(this.children[i] === e.target){
            musicIndex = i
          }
        }
        console.log(musicIndex)
        loadMusic(musicList[musicIndex])
      }
        }
