var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
    container = select('.container'),
    anchorBezierSVG = select('.anchorBezierSVG'),
    nib = select('#nib'),
    nibInnerGroup = select('#nibInnerGroup'),
    
    anchorPopGroup = select('#anchorPopGroup'),
    
    anchorGroupL = select('#anchorGroupL'),
    anchorGroupR = select('#anchorGroupR'),
    
    anchorPointL = select('#anchorPointL'),
    anchorDragLTop = select('#anchorDragLTop'),
    anchorDragLBot = select('#anchorDragLBot'),
    anchorLineLTop = select('#anchorLineLTop'),
    anchorLineLBot = select('#anchorLineLBot'),
    
    anchorPointR = select('#anchorPointR'),
    anchorDragRTop = select('#anchorDragRTop'),
    anchorDragRBot = select('#anchorDragRBot'),
    anchorLineRTop = select('#anchorLineRTop'),
    anchorLineRBot = select('#anchorLineRBot'),
    
    mainLineStart = selectAll('.mainLineStart'),
    mainLine1 = select('#mainLine'),
    mainLineMask = selectAll('.mainLineMask'),
    mainLine1Path = mainLine1.getAttribute('d'),
    mainLine2Path = "M148,122.1c96.1-72.8,377,56.4,504,0",
    mainLineMaskPath = mainLineMask[0].getAttribute('d'),
    mainLine2MaskPath = "M148,122.5c82.2-71.6,377,53.3,504,0C766.5,189.5,65.8,194.1,148,122.5z",
    mainLine3Path = "M148,122.1c152.9,62.6,377,56.4,504,0",
    mainLine3MaskPath = "M148,122.5c152.9,63.6,377,53.3,504,0C766.5,189.5,65.8,194.1,148,122.5z",
    mainLine4Path = "M148,122.1c152.9,62.6,377-83.1,504,0",
    mainLine4MaskPath = "M148,122.5c152.9,63.6,377-84.7,504,0C766.5,189.5,65.8,194.1,148,122.5z",
    anchorPopGroupL = anchorPopGroup.cloneNode(true),
    anchorPopGroupR = anchorPopGroup.cloneNode(true)
  

TweenMax.set('svg', {
  visibility: 'visible'
})

TweenMax.set(container, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  xPercent: -50,
  yPercent: -50
})

anchorBezierSVG.appendChild(anchorPopGroupL);
anchorBezierSVG.appendChild(anchorPopGroupR);
var allPopL = anchorPopGroupL.querySelectorAll('line'), allPopR = anchorPopGroupR.querySelectorAll('line')

TweenMax.staggerTo([allPopL, allPopR], 0, {
  drawSVG:'0% 0%',
  cycle:{
    x:[Number(anchorPointL.getAttribute('x')) - 16,Number(anchorPointR.getAttribute('x'))- 16],
    y:[Number(anchorPointL.getAttribute('y')) - 16,Number(anchorPointR.getAttribute('y'))- 16]
  }
},0)

TweenLite.defaultEase = Sine.easeInOut;

var tl = new TimelineMax({repeat:-1, delay:1}).timeScale(2.13);
tl.to(nib, 1, {
  x:Number(anchorPointL.getAttribute('x'))+7
})
.to(nib, 1.5, {
  y:Number(anchorPointL.getAttribute('y'))+7
},'-=1')
.from(anchorPointL, 1, {
  scale:0,
  transformOrigin:'50% 50%',
  ease:Elastic.easeOut.config(0.5,0.4)
})
  
.to(nib, 0.6, {
  x:anchorDragLTop.getAttribute('cx'),
  y:anchorDragLTop.getAttribute('cy')
})
.from([anchorLineLTop, anchorLineLBot], 0.6, {
  drawSVG:'0% 0%'
},'-=0.6')

.from([anchorDragLTop,anchorDragLBot], 1, {
  attr:{
    r:0
  },
  ease:Elastic.easeOut.config(0.7,0.5)
})
.from(mainLineStart, 0.0001, {
  drawSVG:'0% 0%'
})

.to(nib, 1, {
  x:Number(anchorPointR.getAttribute('x'))+7,
  y:Number(anchorPointR.getAttribute('y'))+7
})
.to(mainLineStart, 1, {
  morphSVG:mainLine1Path
},'-=1')
.from(anchorPointR, 1, {
  scale:0,
  transformOrigin:'50% 50%',
  ease:Elastic.easeOut.config(0.5,0.4)
})
.to(mainLineStart, 0.01, {
  stroke:'#ededed',
  strokeWidth:3
},'-=1')
  
.to(nib, 0.6, {
  x:anchorDragRTop.getAttribute('cx'),
  y:anchorDragRTop.getAttribute('cy')
})
.from([anchorLineRTop, anchorLineRBot], 0.6, {
  drawSVG:'0% 0%'
},'-=0.6')
.from([anchorDragRTop,anchorDragRBot], 1, {
  attr:{
    r:0
  },
  ease:Elastic.easeOut.config(0.7,0.5)
})
.to(mainLineStart, 0.6, {
  morphSVG:mainLine2Path
},'-=1.6')
.to(mainLineMask, 0.6, {
  morphSVG:mainLine2MaskPath
},'-=1.6')

.to(nib, 1, {
  x:anchorDragLTop.getAttribute('cx'),
  y:anchorDragLTop.getAttribute('cy')
})
.to(anchorGroupL, 1, {
  rotation:90,
  transformOrigin:'50% 50%'
})
.to(mainLineStart, 1, {
  morphSVG:mainLine3Path
},'-=1')
.to(mainLineMask, 1, {
  morphSVG:mainLine3MaskPath
},'-=1')

.to(nib, 1, {
  rotation:90,
  svgOrigin:anchorPointL.getAttribute('x') + ' ' + anchorPointL.getAttribute('y')
},'-=1')
.to(nibInnerGroup, 1, {
  rotation:-90,
  transformOrigin:'-28% -28%'
},'-=1')



.to(nib, 1, {
  x:Number(anchorDragRBot.getAttribute('cx'))
})

.to(anchorGroupR, 1, {
  rotation:90,
  transformOrigin:'50% 50%'
})
.to(nib, 1, {
  rotation:180,
  svgOrigin:anchorPointR.getAttribute('x') + ' ' + anchorPointR.getAttribute('y')
},'-=1')

.to(nibInnerGroup, 1, {
  rotation:-180,
  transformOrigin:'-28% -28%'
},'-=1')
.to(mainLineStart, 1, {
  morphSVG:mainLine4Path
},'-=1')
.to(mainLineMask, 1, {
  morphSVG:mainLine4MaskPath
},'-=1')

.set('.maskText1', {
  text:'CODE'
},'-=1')

.to(nib, 1, {
  x:anchorDragLTop.getAttribute('cx'),
  y:anchorDragLTop.getAttribute('cy'),
  rotation:90
})
.to(nibInnerGroup, 1, {
  rotation:-90,
  transformOrigin:'-28% -28%'
},'-=1')
.to(anchorGroupL, 1, {
  rotation:0,
  transformOrigin:'50% 50%'
})
.to(mainLineStart, 1, {
  morphSVG:mainLine1Path
},'-=1')
.to(mainLineMask, 1, {
  morphSVG:mainLineMaskPath
},'-=1')

.to(nib, 1, {
  rotation:0,
  svgOrigin:anchorPointL.getAttribute('x') + ' ' + anchorPointL.getAttribute('y')
},'-=1')
.to(nibInnerGroup, 1, {
  rotation:-0,
  transformOrigin:'-28% -28%'
},'-=1')

//close it
.to(nib, 1, {
  x:Number(anchorPointR.getAttribute('x'))+7,
  y:Number(anchorPointR.getAttribute('y'))+7
})

.to([anchorGroupR, anchorPointR], 0.01, {
  alpha:0
})
.to(allPopR, 0.25, {
  drawSVG:'0% 50%',
  ease:Linear.easeNone
})
.to(allPopR, 0.75, {
  drawSVG:'100% 100%',
  ease:Power2.easeOut
})

.set(mainLineStart,  {
  drawSVG:'0% 0%'
},'-=1')

.to(nib, 1, {
  x:Number(anchorPointL.getAttribute('x'))+7,
  y:Number(anchorPointL.getAttribute('y'))+7,
  delay:0.3
})

.to([anchorGroupL, anchorPointL], 0.01, {
  alpha:0
})
.to(allPopL, 0.25, {
  drawSVG:'0% 50%',
  ease:Linear.easeNone
})
.to(allPopL, 0.75, {
  drawSVG:'100% 100%',
  ease:Power2.easeOut
})
.to(nib, 1,{
  x:0,
  y:0,
  delay:0.3
})
.to('.maskText1', 1, {
  text:'I DESIGN',
  delay:0.3
})