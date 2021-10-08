import {Component, OnInit} from '@angular/core';
import {Container} from '@angular/compiler/src/i18n/i18n_ast';
import {Main, ISourceOptions } from 'tsparticles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BlueRIDGE';
  id = 'tsparticles';

  /* Starting from 1.19.0 you can use a remote url (AJAX request) to a JSON with the configuration */
  particlesUrl = 'http://foo.bar/particles.json';

  /* or the classic JavaScript object */
  options: ISourceOptions = {
    background: {
      color: {
        value: '#FFF'
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
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 30,
        },
        push: {
          quantity: 4
        },
        repulse: {
          distance: 100,
          duration: 0.4
        }
      }

    },
    particles: {
      color: {
        // value: '#a9a9a9'
        value: '#292929'
      },
      links: {
        color: '#171717',
        distance: 200,
        enable: true,
        opacity: 0.7,
        width: 1.5
      },
      collisions: {
        enable: true
      },
      move: {
        direction: 'none',
        enable: true,
        outMode: 'bounce',
        random: false,
        speed: 2,
        straight: false
      },
      number: {
        density: {
          enable: true,
          value_area: 800
        },
        value: 80
      },
      opacity: {
        value: 1
      },
      shape: {
        type: 'diamond'
      },
      size: {
        random: true,
        value: 3
      }

    },
    detectRetina: true
  };


  ngOnInit(): void {
  }

  particlesLoaded(container: any): void {
    console.log(container);
  }

  particlesInit(main: Main): void {
    console.log(main);

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
  }
}
