import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'
const vuetifyOptions = {
  theme: {
    dark: true,
    themes: {
      dark: {
        eventButton: colors.teal.darken2, //dark green
        eventButton2: colors.teal.lighten2, //light green
        commuButton: colors.deepPurple.lighten1, //light purple
        commuButton2: colors.deepPurple.darken2,
        warning: colors.red.base,
        warning2: colors.yellow.darken2,
        success: colors.green.base,
        primary: colors.blueGrey.lighten3,
        secondary: '#2f3136',
        tertiary: '#202225',
        quaternary: '#292b2f',
        quinary: '#393d42',
        contrast: colors.grey.lighten3,

        // senary: '#828386',
        // white: '#fff',
        // grey: '#8a8c90',
        // primaryTransparent: 'rgba(54, 57, 63, 0.3)',

        // groupText: '#8e9297',
        // chatText: '#b9bbbe',
        // chatInput: '#40444b',
        // placeholderInputText: '#6a727e',

        // symbol: '#74777a',
        // notification: '#f84a4b',
        // discord: '#6e86d6',
        // mentionDetail: '#f9a839',
        // mentionMessage: '#413f3f',
        // link: '#5d80d6',
      },
      light: {
        eventButton: colors.green.lighten3, //dark green
        eventButton2: colors.green.darken2, //light green
        commuButton: colors.deepPurple.lighten4, //light purple
        commuButton2: colors.deepPurple.darken2,
        warning: colors.red.base,
        warning2: colors.yellow.darken2,
        success: colors.green.base,
        primary: colors.blueGrey.darken4,
        secondary: colors.grey.lighten2,
        tertiary: colors.grey.lighten3,
        quaternary: colors.grey.lighten4,
        quinary: colors.grey.lighten5,
        contrast: colors.grey.darken4,
      },
    },
    options: {
      customProperties: true,
      variations: false,
    },
  },
}

export default vuetifyOptions
