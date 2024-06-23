/*! Grained.js
 * Author : Sarath Saleem  - https://github.com/sarathsaleem
 * MIT license: http://opensource.org/licenses/MIT
 * GitHub : https://github.com/sarathsaleem/grained
 * v0.0.1
 */

interface Options {
    animate?: boolean
    patternWidth?: number
    patternHeight?: number
    grainOpacity?: number
    grainDensity?: number
    grainWidth?: number
    grainHeight?: number
    grainChaos?: number
    grainSpeed?: number
  }
  
  function grained(ele: string, opt?: Options) {
    let element = null,
      elementId = null,
      selectorElement = null
  
    if (typeof ele === 'string') {
      element = document.getElementById(ele.split('#')[1])
    }
  
    if (!element) {
      console.error('Grained: cannot find the element with id ' + ele)
      return
    } else {
      elementId = element.id
    }
  
    // set style for parent
    if (element.style.position !== 'absolute') {
      element.style.position = 'relative'
    }
    element.style.overflow = 'hidden'
  
    let prefixes = ['', '-moz-', '-o-animation-', '-webkit-', '-ms-']
  
    // default option values
    let options = {
      animate: true,
      patternWidth: 300,
      patternHeight: 300,
      grainOpacity: 0.08,
      grainDensity: 1,
      grainWidth: 1,
      grainHeight: 1,
      grainChaos: 0.5,
      grainSpeed: 10,
    }
  
    Object.assign(options, opt)
  
    let generateNoise = function () {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
  
      if (!ctx) {
        throw new Error('Failed to fetch 2d context')
      }
  
      canvas.width = options.patternWidth
      canvas.height = options.patternHeight
      for (let w = 0; w < canvas.width; w += options.grainDensity) {
        for (let h = 0; h < canvas.height; h += options.grainDensity) {
          let rgb = (Math.random() * 256) | 0
          ctx.fillStyle =
            'rgba(' + [rgb, rgb, rgb, options.grainOpacity].join() + ')'
          ctx.fillRect(w, h, options.grainWidth, options.grainHeight)
        }
      }
      return canvas.toDataURL('image/png')
    }
  
    function addCSSRule(sheet: CSSStyleSheet, selector: string, rules: string) {
      let ins = ''
      if (selector.length) {
        ins = selector + '{' + rules + '}'
      } else {
        ins = rules
      }
  
      if ('insertRule' in sheet) {
        sheet.insertRule(ins)
      } else {
        throw new Error(
          'CSSStyleSheet.insertRule is not supported on your browser'
        )
      }
    }
  
    let noise = generateNoise()
  
    let animation = '',
      keyFrames = [
        '0%:-10%,10%',
        '10%:-25%,0%',
        '20%:-30%,10%',
        '30%:-30%,30%',
        '40%::-20%,20%',
        '50%:-15%,10%',
        '60%:-20%,20%',
        '70%:-5%,20%',
        '80%:-25%,5%',
        '90%:-30%,25%',
        '100%:-10%,10%',
      ]
  
    let pre = prefixes.length
    while (pre--) {
      animation += '@' + prefixes[pre] + 'keyframes grained{'
      for (let key = 0; key < keyFrames.length; key++) {
        let keyVal = keyFrames[key].split(':')
        animation += keyVal[0] + '{'
        animation += prefixes[pre] + 'transform:translate(' + keyVal[1] + ');'
        animation += '}'
      }
      animation += '}'
    }
  
    // add animation keyframe
    let animationAdded = document.getElementById('grained-animation')
    if (animationAdded) {
      animationAdded.parentElement?.removeChild(animationAdded)
    }
    let style = document.createElement('style')
    style.id = 'grained-animation'
    style.innerHTML = animation
    document.body.appendChild(style)
  
    // add customized style
    let styleAdded = document.getElementById('grained-animation-' + elementId)
    if (styleAdded) {
      styleAdded.parentElement?.removeChild(styleAdded)
    }
  
    style = document.createElement('style')
    style.id = 'grained-animation-' + elementId
    document.body.appendChild(style)
  
    let rule = 'background-image: url(' + noise + ');'
    rule +=
      'position: absolute;content: "";height: 300%;width: 300%;left: -100%;top: -100%;'
    pre = prefixes.length
    if (options.animate) {
      while (pre--) {
        rule += prefixes[pre] + 'animation-name:grained;'
        rule += prefixes[pre] + 'animation-iteration-count: infinite;'
        rule += prefixes[pre] + 'animation-duration: ' + options.grainChaos + 's;'
        rule +=
          prefixes[pre] +
          'animation-timing-function: steps(' +
          options.grainSpeed +
          ', end);'
      }
    }
  
    // element selector to add grains
    selectorElement = '#' + elementId + '::before'
  
    if (!style.sheet) throw new Error('style.sheet not found')
  
    addCSSRule(style.sheet, selectorElement, rule)
  }
  
  export default grained