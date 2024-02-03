import type {GetSettings} from "~/server/types/settings";

interface SettingsState {
  settings: GetSettings | null
  events_calendar_config: any
}
export const useSettingsStore = defineStore('settingsStore', {
  state: (): SettingsState => ({
    settings: null,
    events_calendar_config: {
      style: {
        fontFamily: 'Inter var',
        colorSchemes: {
          indianRed: {
            color: "#000000",
            backgroundColor: "#CD5C5C",
          },
          lightCoral: {
            color: "#000000",
            backgroundColor: "#F08080",
          },
          salmon: {
            color: "#000000",
            backgroundColor: "#FA8072",
          },
          darkSalmon: {
            color: "#000000",
            backgroundColor: "#E9967A",
          },
          crimson: {
            color: "#000000",
            backgroundColor: "#DC143C",
          },
          red: {
            color: "#000000",
            backgroundColor: "#FF0000",
          },
          fireBrick: {
            color: "#000000",
            backgroundColor: "#B22222",
          },
          darkRed: {
            color: "#000000",
            backgroundColor: "#8B0000",
          },
          pink: {
            color: "#000000",
            backgroundColor: "#FFC0CB",
          },
          lightPink: {
            color: "#000000",
            backgroundColor: "#FFB6C1",
          },
          hotPink: {
            color: "#000000",
            backgroundColor: "#FF69B4",
          },
          deepPink: {
            color: "#000000",
            backgroundColor: "#FF1493",
          },
          mediumVioletRed: {
            color: "#000000",
            backgroundColor: "#C71585",
          },
          paleVioletRed: {
            color: "#000000",
            backgroundColor: "#DB7093",
          },
          lightSalmon: {
            color: "#000000",
            backgroundColor: "#FFA07A",
          },
          coral: {
            color: "#000000",
            backgroundColor: "#FF7F50",
          },
          tomato: {
            color: "#000000",
            backgroundColor: "#FF6347",
          },
          orangeRed: {
            color: "#000000",
            backgroundColor: "#FF4500",
          },
          darkOrange: {
            color: "#000000",
            backgroundColor: "#FF8C00",
          },
          orange: {
            color: "#000000",
            backgroundColor: "#FFA500",
          },
          gold: {
            color: "#000000",
            backgroundColor: "#FFD700",
          },
          yellow: {
            color: "#000000",
            backgroundColor: "#FFFF00",
          },
          lightYellow: {
            color: "#000000",
            backgroundColor: "#FFFFE0",
          },
          lemonChiffon: {
            color: "#000000",
            backgroundColor: "#FFFACD",
          },
          lightGoldenrodYellow: {
            color: "#000000",
            backgroundColor: "#FAFAD2",
          },
          papayaWhip: {
            color: "#000000",
            backgroundColor: "#FFEFD5",
          },
          moccasin: {
            color: "#000000",
            backgroundColor: "#FFE4B5",
          },
          peachPuff: {
            color: "#000000",
            backgroundColor: "#FFDAB9",
          },
          paleGoldenrod: {
            color: "#000000",
            backgroundColor: "#EEE8AA",
          },
          khaki: {
            color: "#000000",
            backgroundColor: "#F0E68C",
          },
          darkKhaki: {
            color: "#000000",
            backgroundColor: "#BDB76B",
          },
          lavender: {
            color: "#000000",
            backgroundColor: "#E6E6FA",
          },
          thistle: {
            color: "#000000",
            backgroundColor: "#D8BFD8",
          },
          plum: {
            color: "#000000",
            backgroundColor: "#DDA0DD",
          },
          violet: {
            color: "#000000",
            backgroundColor: "#EE82EE",
          },
          orchid: {
            color: "#000000",
            backgroundColor: "#DA70D6",
          },
          fuchsia: {
            color: "#000000",
            backgroundColor: "#FF00FF",
          },
          magenta: {
            color: "#000000",
            backgroundColor: "#FF00FF",
          },
          mediumOrchid: {
            color: "#000000",
            backgroundColor: "#BA55D3",
          },
          mediumPurple: {
            color: "#000000",
            backgroundColor: "#9370DB",
          },
          blueViolet: {
            color: "#000000",
            backgroundColor: "#8A2BE2",
          },
          darkViolet: {
            color: "#000000",
            backgroundColor: "#9400D3",
          },
          darkOrchid: {
            color: "#000000",
            backgroundColor: "#9932CC",
          },
          darkMagenta: {
            color: "#000000",
            backgroundColor: "#8B008B",
          },
          purple: {
            color: "#000000",
            backgroundColor: "#800080",
          },
          indigo: {
            color: "#000000",
            backgroundColor: "#4B0082",
          },
          slateBlue: {
            color: "#000000",
            backgroundColor: "#6A5ACD",
          },
          darkSlateBlue: {
            color: "#000000",
            backgroundColor: "#483D8B",
          },
          cornsilk: {
            color: "#000000",
            backgroundColor: "#FFF8DC",
          },
          blanchedAlmond: {
            color: "#000000",
            backgroundColor: "#FFEBCD",
          },
          bisque: {
            color: "#000000",
            backgroundColor: "#FFE4C4",
          },
          navajoWhite: {
            color: "#000000",
            backgroundColor: "#FFDEAD",
          },
          wheat: {
            color: "#000000",
            backgroundColor: "#F5DEB3",
          },
          burlyWood: {
            color: "#000000",
            backgroundColor: "#DEB887",
          },
          tan: {
            color: "#000000",
            backgroundColor: "#D2B48C",
          },
          rosyBrown: {
            color: "#000000",
            backgroundColor: "#bc8f8f",
          },
          sandyBrown: {
            color: "#000000",
            backgroundColor: "#f4a460",
          },
          goldenrod: {
            color: "#000000",
            backgroundColor: "#daa520",
          },
          darkGoldenRod: {
            color: "#000000",
            backgroundColor: "#b8860b",
          },
          peru: {
            color: "#000000",
            backgroundColor: "#cd853f",
          },
          chocolate: {
            color: "#000000",
            backgroundColor: "#d2691e",
          },
          saddleBrown: {
            color: "#000000",
            backgroundColor: "#8b4513",
          },
          sienna: {
            color: "#000000",
            backgroundColor: "#a0522d",
          },
          brown: {
            color: "#000000",
            backgroundColor: "#a52a2a",
          },
          maroon: {
            color: "#000000",
            backgroundColor: "#800000",
          },
          greenYellow: {
            color: "#000000",
            backgroundColor: "#ADFF2F",
          },
          chartreuse: {
            color: "#000000",
            backgroundColor: "#7FFF00",
          },
          lawnGreen: {
            color: "#000000",
            backgroundColor: "#7CFC00",
          },
          lime: {
            color: "#000000",
            backgroundColor: "#00FF00",
          },
          limeGreen: {
            color: "#000000",
            backgroundColor: "#32CD32",
          },
          paleGreen: {
            color: "#000000",
            backgroundColor: "#98FB98",
          },
          lightGreen: {
            color: "#000000",
            backgroundColor: "#90EE90",
          },
          mediumSpringGreen: {
            color: "#000000",
            backgroundColor: "#00FA9A",
          },
          springGreen: {
            color: "#000000",
            backgroundColor: "#00FF7F",
          },
          mediumSeaGreen: {
            color: "#000000",
            backgroundColor: "#3CB371",
          },
          seaGreen: {
            color: "#000000",
            backgroundColor: "#2E8B57",
          },
          forestGreen: {
            color: "#000000",
            backgroundColor: "#228B22",
          },
          green: {
            color: "#000000",
            backgroundColor: "#008000",
          },
          darkGreen: {
            color: "#000000",
            backgroundColor: "#006400",
          },
          yellowGreen: {
            color: "#000000",
            backgroundColor: "#9ACD32",
          },
          oliveDrab: {
            color: "#000000",
            backgroundColor: "#6B8E23",
          },
          olive: {
            color: "#000000",
            backgroundColor: "#808000",
          },
          darkOliveGreen: {
            color: "#000000",
            backgroundColor: "#556B2F",
          },
          mediumAquamarine: {
            color: "#000000",
            backgroundColor: "#66CDAA",
          },
          darkSeaGreen: {
            color: "#000000",
            backgroundColor: "#8FBC8F",
          },
          lightSeaGreen: {
            color: "#000000",
            backgroundColor: "#20B2AA",
          },
          darkCyan: {
            color: "#000000",
            backgroundColor: "#008B8B",
          },
          teal: {
            color: "#000000",
            backgroundColor: "#008080",
          },
          aqua: {
            color: "#000000",
            backgroundColor: "#00FFFF",
          },
          cyan: {
            color: "#000000",
            backgroundColor: "#00FFFF",
          },
          lightCyan: {
            color: "#000000",
            backgroundColor: "#E0FFFF",
          },
          paleTurquoise: {
            color: "#000000",
            backgroundColor: "#AFEEEE",
          },
          aquamarine: {
            color: "#000000",
            backgroundColor: "#7FFFD4",
          },
          turquoise: {
            color: "#000000",
            backgroundColor: "#40E0D0",
          },
          mediumTurquoise: {
            color: "#000000",
            backgroundColor: "#48D1CC",
          },
          darkTurquoise: {
            color: "#000000",
            backgroundColor: "#00CED1",
          },
          cadetBlue: {
            color: "#000000",
            backgroundColor: "#5F9EA0",
          },
          steelBlue: {
            color: "#000000",
            backgroundColor: "#4682B4",
          },
          lightSteelBlue: {
            color: "#000000",
            backgroundColor: "#B0C4DE",
          },
          powderBlue: {
            color: "#000000",
            backgroundColor: "#B0E0E6",
          },
          lightBlue: {
            color: "#000000",
            backgroundColor: "#ADD8E6",
          },
          skyBlue: {
            color: "#000000",
            backgroundColor: "#87CEEB",
          },
          lightSkyBlue: {
            color: "#000000",
            backgroundColor: "#87CEFA",
          },
          deepSkyBlue: {
            color: "#000000",
            backgroundColor: "#00BFFF",
          },
          dodgerBlue: {
            color: "#000000",
            backgroundColor: "#1E90FF",
          },
          cornflowerBlue: {
            color: "#000000",
            backgroundColor: "#6495ED",
          },
          mediumSlateBlue: {
            color: "#000000",
            backgroundColor: "#7B68EE",
          },
          royalBlue: {
            color: "#000000",
            backgroundColor: "#4169E1",
          },
          blue: {
            color: "#000000",
            backgroundColor: "#0000FF",
          },
          mediumBlue: {
            color: "#000000",
            backgroundColor: "#0000CD",
          },
          darkBlue: {
            color: "#000000",
            backgroundColor: "#00008B",
          },
          navy: {
            color: "#000000",
            backgroundColor: "#000080",
          },
          midnightBlue: {
            color: "#000000",
            backgroundColor: "#191970",
          },
          snow: {
            color: "#131313",
            backgroundColor: "#FFFAFA",
          },
          honeydew: {
            color: "#131313",
            backgroundColor: "#F0FFF0",
          },
          mintCream: {
            color: "#131313",
            backgroundColor: "#F5FFFA",
          },
          azure: {
            color: "#131313",
            backgroundColor: "#F0FFFF",
          },
          aliceBlue: {
            color: "#131313",
            backgroundColor: "#F0F8FF",
          },
          ghostWhite: {
            color: "#131313",
            backgroundColor: "#F8F8FF",
          },
          whiteSmoke: {
            color: "#131313",
            backgroundColor: "#F5F5F5",
          },
          seashell: {
            color: "#131313",
            backgroundColor: "#FFF5EE",
          },
          beige: {
            color: "#000000",
            backgroundColor: "#f5f5dc",
          },
          oldLace: {
            color: "#000000",
            backgroundColor: "#fdf5e6",
          },
          floralWhite: {
            color: "#000000",
            backgroundColor: "#fffaf0",
          },
          ivory: {
            color: "#000000",
            backgroundColor: "#fffff0",
          },
          antiqueWhite: {
            color: "#000000",
            backgroundColor: "#faebd7",
          },
          linen: {
            color: "#000000",
            backgroundColor: "#faf0e6",
          },
          lavenderBlush: {
            color: "#000000",
            backgroundColor: "#fff0f5",
          },
          mistyRose: {
            color: "#000000",
            backgroundColor: "#ffe4e1",
          },
          gainsboro: {
            color: "#000000",
            backgroundColor: "#dcdcdc",
          },
          lightGrey: {
            color: "#000000",
            backgroundColor: "#d3d3d3",
          },
          lightGray: {
            color: "#000000",
            backgroundColor: "#d3d3d3",
          },
          silver: {
            color: "#000000",
            backgroundColor: "#c0c0c0",
          },
          darkGray: {
            color: "#000000",
            backgroundColor: "#a9a9a9",
          },
          darkGrey: {
            color: "#000000",
            backgroundColor: "#a9a9a9",
          },
          gray: {
            color: "#000000",
            backgroundColor: "#808080",
          },
          grey: {
            color: "#000000",
            backgroundColor: "#808080",
          },
          dimGray: {
            color: "#000000",
            backgroundColor: "#696969",
          },
          dimGrey: {
            color: "#000000",
            backgroundColor: "#696969",
          },
          lightSlateGray: {
            color: "#000000",
            backgroundColor: "#778899",
          },
          lightSlateGrey: {
            color: "#000000",
            backgroundColor: "#778899",
          },
          slateGray: {
            color: "#000000",
            backgroundColor: "#708090",
          },
          slateGrey: {
            color: "#000000",
            backgroundColor: "#708090",
          },
          darkSlateGray: {
            color: "#000000",
            backgroundColor: "#2f4f4f",
          },
          darkSlateGrey: {
            color: "#000000",
            backgroundColor: "#2f4f4f",
          },
        },
      },
      showCurrentTime: true,
      locale: 'ru-RU',
      defaultMode: 'week',
      dayBoundaries: {
        start: 7,
        end: 24,
      },
    }
  })
})
