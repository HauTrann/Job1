import {ISourceOptions} from "tsparticles";

export const listRecordPaging = [
  {id: 10, name: 10},
  {id: 50, name: 50},
  {id: 100, name: 100},
];

export function getPagesize() {
  const innerWidth = window.innerWidth;
  let msizepage = 5;
  if ((innerWidth) < 768) {
    msizepage = 3;
  }
  return msizepage;
}

export class UtilsValue {
  static ResponeType1:any = {
    observe: 'response',
    responseType: 'json'
  };

  static options: ISourceOptions = {
    background: {
      color: {
        "value": "#ffffff"
      }
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onClick: {
          enable: true,
          mode: 'push'
        },
        onHover: {
          enable: true,
          mode: 'repulse'
        },
        resize: true
      },
      modes: {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 8,
          size: 40,
        },
        push: {
          quantity: 5,
          "particles_nb": 4
        },
        repulse: {
          distance: 200
        },
        "remove": {
          "particles_nb": 2
        }
      }

    },
    particles: {
      color: {
        // value: '#a9a9a9'
        value: '#292929'
      },
      links: {
        color: 'rgba(38,38,38,0.72)',
        distance: 200,
        enable: true,
        opacity: 0.7,
        width: 0.9
      },
      collisions: {
        enable: true
      },
      move: {
        "enable": true,
        "speed": 3,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      },
      number: {
        density: {
          enable: true,
          value_area: 800
        },
        value: 80
      },
      opacity: {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      shape: {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      size: {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      }

    },
    detectRetina: true,
    "retina_detect": true,
  };

}
