<template>
  <div id="app">
    <div class="container">
      <div id="app-side">
          <h1 id="logo">
            <i class="logo-bars"></i>
            <span class="logo-text">Burger Generator</span>
          </h1>

          <div id="burger-options">
            <div class="options-field">
              <label for="width-slider">Bar Width</label>

              <div class="input-wrapper input-wrapper--slider">
                <div id="width-slider"></div>
                <input type="number" class="form-control option-sm" v-model="barWidth">
              </div>
            </div>

            <div class="options-field">
              <label for="width-slider">Bar Height</label>

              <div class="input-wrapper input-wrapper--slider">
                <div id="height-slider"></div>
                <input type="number" class="form-control option-sm" v-model="barHeight">
              </div>
            </div>

            <div class="options-field">
              <label for="width-slider">Bar Gap</label>

              <div class="input-wrapper input-wrapper--slider">

                <div id="gap-slider"></div>
                <input type="number" class="form-control option-sm" v-model="barGap">
              </div>
            </div>

            <div class="options-field">
              <label>Show Button Label Text?</label>

              <div class="input-wrapper">
                <toggle-button class="options-switch" :color="primaryColor" v-model="showBtnText" />
              </div>
            </div>

            <template v-if="showBtnText">
              <div class="options-field">
                <label for="button-text">Label Text</label>

                <div class="input-wrapper">
                  <input id="button-text" type="text" class="form-control" v-model="btnText">
                </div>
              </div>

              <div class="options-field">
                <label for="font-size">Font Size</label>

                <div class="input-wrapper">
                  <input id="font-size" type="number" class="form-control" v-model="fontSize">

                  <label for="font-unit" class="sr-only">Font Size Unit</label>
                  <select id="font-unit" class="form-control option-sm" v-model="fontSizeUnit">
                    <option value="rem">rem</option>
                    <option value="px">px</option>
                    <option value="em">em</option>
                  </select>
                </div>
              </div>

              <div class="options-field">
                <label for="font-weight">Font Weight</label>

                <div class="input-wrapper">
                  <input id="font-weight" type="number" class="form-control" v-model="fontWeight">
                </div>
              </div>

              <div class="options-field">
                <label for="text-space">Text Space</label>

                <div class="input-wrapper">
                  <input id="text-space" type="number" class="form-control" v-model="textSpace">

                  <label for="font-unit" class="sr-only">Test Space Unit</label>
                  <select id="font-unit" class="form-control option-sm" v-model="textSpaceUnit">
                    <option value="px">px</option>
                    <option value="rem">rem</option>
                    <option value="em">em</option>
                  </select>
                </div>
              </div>
            </template>
          </div>

          <div id="burger-export">
            <a href="#modal-export" id="btn-export" class="btn btn-embossed btn-primary modaal" data-modaal-type="inline" data-modaal-animation="fade">
              Export
            </a>
          </div>
      </div>

      <div id="app-main">
        <button class="btn-menu" type="button" @click="menuClick" :style="{ minHeight: ((this.barHeight * 3) + (this.barGap * 2) + 20) + 'px' }">
          <span class="click-me" :style="{ left: (-60 + barWidth / 2) + 'px' }">
            Click me!
            <i class="far fa-level-down"></i>
          </span>
          <i class="btn-menu__bars" :style="barStyles"></i>
          <span class="btn-menu__text" :style="textStyles" v-if="showBtnText">{{btnText}}</span>
        </button>
      </div>

      <div id="modal-export" style="display:none;">
        <nav class="tabs">
          <button v-for="tab in tabs" :key="tab.value" :class="['tabs__item', currentTab === tab.value ? 'active' : '']" @click="handleTabClick(tab.value)">
            {{tab.title}}
          </button>
        </nav>
        <div class="tab-content">
          <div v-show="currentTab === 'scss'">
            <prism class="code-block" language="scss" :code="scssCode"></prism>

            <button class="btn btn-embossed btn-primary" v-clipboard="scssCode" v-clipboard:error="clipboardErrorHandler">
              Copy to Clipboard
            </button>
          </div>
          <div v-show="currentTab === 'js'">
            <p>All this does is toggle a class on the body tag that we use to toggle the animation.</p>
            <label>
              jQuery?
              <toggle-button class="flat-switch" :color="primaryColor" v-model="isJquery" />
            </label>

            <div v-show="!isJquery">
              <prism class="code-block" language="js" :code="jsCode"></prism>
            </div>
            <div v-show="isJquery">
              <prism class="code-block" language="js" :code="jqueryCode"></prism>
            </div>

            <button class="btn btn-embossed btn-primary" v-clipboard="() => isJquery ? jqueryCode : jsCode" v-clipboard:error="clipboardErrorHandler">
              Copy to Clipboard
            </button>
          </div>
          <div v-show="currentTab === 'html'">
            <prism class="code-block" language="html" :code="htmlCode"></prism>
            <button class="btn btn-embossed btn-primary" v-clipboard="htmlCode" v-clipboard:error="clipboardErrorHandler">
              Copy to Clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Clipboard from 'v-clipboard'
import { ToggleButton } from 'vue-js-toggle-button'
import Prism from 'vue-prismjs'

Vue.use(Clipboard)

export default {
  name: 'App',
  components: {
    ToggleButton,
    Prism
  },
  data () {
    return {
      primaryColor: '#3498db',
      barWidth: 30,
      barHeight: 4,
      barGap: 8,
      tabs: [
        { title: 'SCSS', value: 'scss' },
        { title: 'JS', value: 'js' },
        { title: 'HTML', value: 'html' },
      ],
      currentTab: 'scss',
      showText: false,
      isJquery: false,
      jsCode: `var btnMenu = document.getElementsByClassName("btn-menu");
var body = document.body
for (var i = 0; i < btnMenu.length; i++) {
    btnMenu[i].addEventListener('click', function () {
        body.classList.toggle('menu-open');
    });
}`,
      jqueryCode: `$('.btn-menu').on('click', function() {
    $('body').toggleClass('menu-open');
});`,
      showBtnText: false,
      btnText: 'Menu',
      fontSize: 1.125,
      fontSizeUnit: 'rem',
      fontWeight: 700,
      textSpace: 10,
      textSpaceUnit: 'px',
    }
  },
  mounted: function () {
    this.setupSliders()
  },
  watch: {
    barWidth: function (width) {
      $("#width-slider").slider({
        value: parseInt(width)
      })
    },
    barHeight: function (height) {
      $("#height-slider").slider({
        value: parseInt(height)
      })
    },
    barGap: function (gap) {
      $("#gap-slider").slider({
        value: gap
      })
    }
  },
  computed: {
    barStyles: function () {
      return {
        '--gapBefore': -(parseInt(this.barHeight) + parseInt(this.barGap)) + 'px',
        '--gapAfter': (parseInt(this.barHeight) + parseInt(this.barGap)) + 'px',
        'width': this.barWidth + 'px',
        'height': this.barHeight + 'px',
      }
    },
    textStyles: function () {
      return {
        'fontSize': this.fontSize + this.fontSizeUnit,
        'fontWeight': this.fontWeight,
        'marginLeft': this.textSpace + this.textSpaceUnit,
      }
    },
    scssCode: function () {
      var scss = [
        {
          selector: '.btn-menu',
          declarations: [
            {
              property: 'display',
              value: 'flex'
            },
            {
              property: 'align-items',
              value: 'center'
            },
            {
              property: 'justify-content',
              value: 'center'
            },
            {
              property: 'min-height',
              value: (this.barHeight * 3) + (this.barGap * 2) + 'px'
            },
            {
              property: 'background-color',
              value: 'transparent'
            },
            {
              property: 'color',
              value: 'inherit'
            },
            {
              property: 'padding-left',
              value: '0'
            },
            {
              property: 'padding-right',
              value: '0'
            },
            {
              property: 'cursor',
              value: 'pointer'
            },
            {
              property: 'transition',
              value: '.3s ease'
            }
          ],
          properties: [
            {
              selector: '&:focus',
              declarations: [
                {
                  property: 'outline',
                  value: 'none'
                }
              ],
            },
            {
              selector: '&__text',
              declarations: [
                {
                  property: 'margin-left',
                  value: this.textSpace + this.textSpaceUnit
                },
                {
                  property: 'font-size',
                  value: this.fontSize + this.fontSizeUnit
                },
                {
                  property: 'font-weight',
                  value: this.fontWeight
                },
                {
                  property: 'line-height',
                  value: '1'
                }
              ],
            },
            {
              selector: '&__bars',
              declarations: [
                {
                  property: 'display',
                  value: 'block'
                },
                {
                  property: 'position',
                  value: 'relative'
                },
                {
                  property: 'width',
                  value: this.barWidth + 'px'
                },
                {
                  property: 'height',
                  value: this.barHeight + 'px'
                },
                {
                  property: 'background-color',
                  value: '$brand-primary'
                },
                {
                  property: 'transition',
                  value: '.3s'
                }
              ],
              properties: [
                {
                  selector: '&:before, &:after',
                  declarations: [
                    {
                      property: 'content',
                      value: '""'
                    },
                    {
                      property: 'display',
                      value: 'block'
                    },
                    {
                      property: 'position',
                      value: 'absolute'
                    },
                    {
                      property: 'left',
                      value: '0'
                    },
                    {
                      property: 'width',
                      value: '100%'
                    },
                    {
                      property: 'height',
                      value: '100%'
                    },
                    {
                      property: 'background-color',
                      value: '$brand-primary'
                    },
                    {
                      property: 'transition',
                      value: '.3s'
                    }
                  ]
                },
                {
                  selector: '&:before',
                  declarations: [
                    {
                      property: 'transform',
                      value: `translate(0, ${-(parseInt(this.barHeight) + parseInt(this.barGap))}px)`
                    }
                  ]
                },
                {
                  selector: '&:after',
                  declarations: [
                    {
                      property: 'transform',
                      value: `translate(0, ${(parseInt(this.barHeight) + parseInt(this.barGap))}px)`
                    }
                  ]
                }
              ]
            },
            {
              selector: '.menu-open &',
              declarations: [],
              properties: [
                {
                  selector: '.btn-menu__bars',
                  declarations: [
                    {
                      property: 'background-color',
                      value: 'transparent'
                    }
                  ],
                  properties: [
                    {
                      selector: '&:before',
                      declarations: [
                        {
                          property: 'transform',
                          value: 'rotate(45deg)'
                        }
                      ]
                    },
                    {
                      selector: '&:after',
                      declarations: [
                        {
                          property: 'transform',
                          value: 'rotate(-45deg)'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]

      return this.propertiesLoop(scss)
    },
    htmlCode: function () {
      if ( this.showBtnText ) {
        var html = `<button class="btn-menu" type="button">
    <i class="btn-menu__bars"></i>
    <span class="btn-menu__text">`+this.btnText+`</span>
</button>`
      } else {
        var html = `<button class="btn-menu" type="button">
    <i class="btn-menu__bars"></i>
    <span class="sr-only">Menu</span>
</button>`
      }

      return html
    }
  },
  methods: {
    menuClick() {
      var body = document.body
      body.classList.toggle('menu-open');
    },
    setupSliders() {
      if ($("#width-slider").length > 0) {
        var setWidth = this.setWidth

        $("#width-slider").slider({
          min: 1,
          max: 50,
          value: this.barWidth,
          orientation: "horizontal",
          range: "min",
          slide: function (event, ui) {
            setWidth(ui.value)
          }
        })
      }

      if ($("#height-slider").length > 0) {
        var setHeight = this.setHeight

        $("#height-slider").slider({
          min: 1,
          max: 10,
          value: this.barHeight,
          orientation: "horizontal",
          range: "min",
          slide: function (event, ui) {
            setHeight(ui.value)
          }
        })
      }

      if ($("#gap-slider").length > 0) {
        var setGap = this.setGap

        $("#gap-slider").slider({
          min: 1,
          max: 10,
          value: this.barGap,
          orientation: "horizontal",
          range: "min",
          slide: function (event, ui) {
            setGap(ui.value)
          }
        })
      }
    },
    setWidth(value) {
      this.barWidth = value
    },
    setHeight(value) {
      this.barHeight = value
    },
    setGap(value) {
      this.barGap = value
    },
    handleTabClick(newTab) {
      this.currentTab = newTab;
    },
    propertiesLoop(propertiesObj, indentNum = 0 ) {
      var properties = ''
      var indent = '    '

      for (var i = 0; i < propertiesObj.length; i++) {
        var property = propertiesObj[i]
        var declarations = ''

        for (var x = 0; x < property.declarations.length; x++) {
          var declaration = property.declarations[x]
          if (declaration.value !== '') {
            declarations += (indent.repeat(indentNum + 1)) + declaration.property + ': ' + declaration.value + ';\n'
          }
        }

        if (property.properties) {
          declarations += '\n' + this.propertiesLoop(property.properties, indentNum + 1)
        }

        properties += `${ (i > 0 ? '\n' : '') + (indentNum > 0 ? indent.repeat(indentNum) : '') + property.selector } {\n${declarations.replace(/\n$/, "")}\n${ (indentNum > 0 ? indent.repeat(indentNum) : '') }}\n`
      }

      return properties
    },
    clipboardErrorHandler ({ value, event }) {
      console.log('error', value)
    }
  }
}
</script>

<style src="@/assets/scss/style.scss" lang="scss"></style>
<style lang="scss">
  .button-test {
    width: var(barwidth, 30);
  }
</style>