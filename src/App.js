import React from 'react';
import Container from 'react-bootstrap/Container';

import Button from 'react-bootstrap/Button';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { gsap } from "gsap";

// Things to improve, make orbit have more rings
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);

		// Container for slide components
    this.slideRefs = [];
		// Slide tween
		this.slidetl = gsap.timeline({ paused: true });

    // Container for fill components
    this.fillRefs = [];
    // Fill tween
    this.filltl = gsap.timeline({ paused: true });

    // Container for orbit components
    this.orbitRef = [];
    // Fill tween
    this.orbittl = gsap.timeline({ paused: true });

    // Container for rain components
    this.rainRef = [];
    // Rain tween
    this.raintl = gsap.timeline({ paused: true });

    // Container for jump components
    this.jumpRef = [];
    // Jump tween
    this.jumptl = gsap.timeline({ paused: true });

    // Container for grow components
    this.growRef = null;
    // Jump tween
    this.growtl = gsap.timeline({ paused: true });
  }

  handleResize () {
    window.location.reload();
  }

  componentDidUpdate() {
    window.addEventListener('resize', this.handleResize);
  }

  componentDidMount(){
    window.addEventListener('resize', this.handleResize);

    for(let i=0; i < this.slideRefs.length; i++) {
      this.slidetl.to(this.slideRefs[i], {
        duration: (window.innerWidth/300),
        x: i%2 === 0 ? window.innerWidth + 50 : -1 * (window.innerWidth + 50),
      }, i/2)
    }

    this.filltl.to(this.fillRefs, {
      duration: 1,
      scale: 1,
      rotation: 360,
      ease: 'elastic.out(1.5, 1)',
      stagger: {
        each: 0.1,
        grid: "auto",
        from: "center"
      }
    }).to(this.fillRefs, {
      duration: 1,
      scale: 0,
      rotation: 360,
      ease: 'elastic.in(1.5, 1)',
      stagger: {
        each: 0.1,
        grid: "auto",
        from: "center"
      }
    });

    const radius = ((window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth)+ 300)/4;
    // total duration should sum to 15 and rotation to 720
    for(let x=0; x < this.orbitRef.length; x++){
      for(let i=0; i < this.orbitRef[x].length; i++) {
        this.orbittl.to(this.orbitRef[x][i], {
          duration: 6,
          rotation: x%2===0 ? 288 : -288,
          transformOrigin:'50% '+(radius+60*x)+'px',
          ease: 'none',
          autoAlpha: 1,
        }, i/this.orbitRef[x].length * 15 * 360 / 720)
        .to(this.orbitRef[x][i], {
          duration: 7,
          rotation: x%2===0 ? 720-96 : -1*(720-96),
          transformOrigin:'50% '+(radius+60*x)+'px',
          ease: 'none',
        }, (i/this.orbitRef[x].length * 15 * 360 / 720) + 6)
        .to(this.orbitRef[x][i], {
          duration: 2,
          rotation: x%2===0 ? 720 : -720,
          transformOrigin:'50% '+(radius+60*x)+'px',
          ease: 'none',
          autoAlpha: 0,
        }, (i/this.orbitRef[x].length * 15 * 360 / 720) + 13);
      }
    }

    this.raintl.to(this.rainRef, {
      duration: 3,
      y: window.innerHeight + 150,
      ease: "bounce.out",
      stagger: {
        each: 0.1,
        from: 'random',
        grid: 'auto'
      }
    });

    this.jumptl.to(this.jumpRef, {
      duration: 1,
      scale: 1,
      y: '-50',
      ease: 'bounce.in',
      stagger: {
        each: 0.5,
        grid: "auto",
        from: "random"
      }
    }).to(this.jumpRef, {
      duration: 1,
      scale: 0,
      y: '50',
      ease: 'elastic.in(1.5, 1)',
      stagger: {
        each: 0.1,
        grid: "auto",
        from: "random"
      }
    });

    this.growtl.to(this.growRef, {
      duration: 2,
      scale: 10,
      ease: "bounce.in"
    }).to(this.growRef, {
      duration: 2,
      scale: 0,
      ease: "bounce.out"
    });
  }

  render () {
    const containerStyle = {
      backgroundColor: 'white',
      maxHeight: '50vh',
      width: '20vw',
      alignItems: 'flex-start',
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderColor: 'blue',
      borderRadius: 20,
      padding: '16px',
      zIndex: '10',
    };

    const buttonStyle = {
      margin: '8px',
      fontWeight: 'bold',
    };

    const slideComponents = []
    for(let i = 25; i < window.innerHeight; i += 60) {
      slideComponents.push( // remember it's -50 not 50
        <img
  				src={require("./cake.png")}
  				alt=""
          style={{
            position: 'absolute',
            left: ((i-25)/60)%2 === 0 ? '-50px' : null,
            top: i+'px',
            right: ((i-25)/60)%2 === 0 ? null : '-50px',
            transform: 'translate(0%, -50%)',
            width: '50px',
            height: '50px',
            zIndex: '0',
          }}
          ref = {img => this.slideRefs[(i-25)/60] = img}
          key = {i+'px'}
  			/>
      );
    }

    const fillComponent = [];
    for(let i = 25; i < window.innerHeight; i += 60) {
      let temp = [];
      let tempRefs = [];
      for(let j = 0; j < window.innerWidth; j += 60) {
        temp.push(
          <img
    				src={require("./cake.png")}
    				alt=""
            style={{
              position: 'absolute',
              left: j+'px',
              top: i+'px',
              transform: 'translate(0%, -50%) scale(0.0)',
              width: '50px',
              height: '50px',
              zIndex: '0',
            }}
            ref = {img => tempRefs[j/60] = img}
            key = {i+j+'px'}
    			/>
        );
      }
      fillComponent.push(temp);
      this.fillRefs.push(tempRefs);
    }

    const orbitComponents = [];
    const diameter = ((window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth)+ 300)/2;
    const maxRings = 3;
    for(let x=0; x < maxRings; x++) {
      let temp = [];
      let tempRefs = [];
      for(let i = 0; i < (Math.PI * (diameter+120*x) ) / 100 ; i++) {
        temp.push(
          <img
            src={require("./cake.png")}
            alt=""
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, 0%) translate(0, '+(-1*(diameter+120*x)/2) +'px)',
              width: '50px',
              height: '50px',
              zIndex: '0',
              opacity: '0',
            }}
            ref = {img => tempRefs[i] = img}
            key = {i + x + 'ring'}
          />
        );
      }
      orbitComponents.push(temp);
      this.orbitRef.push(tempRefs);
    }

    const rainComponents = [];
    for(let i = 0; i < window.innerWidth; i+=5) {
      rainComponents.push(
        <img
  				src={require("./cake.png")}
  				alt=""
          style={{
            position: 'absolute',
            left: i+'px',
            top: '0',
            transform: 'translate(-50%, -100%)',
            width: '50px',
            height: '50px',
            zIndex: '0',
          }}
          ref = {img => this.rainRef[i/10] = img}
          key = {i+'px'}
  			/>
      );
    }

    const jumpComponent = [];
    for(let i = 85 ; i < window.innerHeight+60; i += 60) {
      let temp = [];
      let tempRefs = [];
      for(let j = 0; j < window.innerWidth; j += 60) {
        temp.push(
          <img
            src={require("./cake.png")}
            alt=""
            style={{
              position: 'absolute',
              left: j+'px',
              top: i+'px',
              transform: 'translate(0%, -50%) scale(0.0)',
              width: '50px',
              height: '50px',
              zIndex: '0',
            }}
            ref = {img => tempRefs[j/60] = img}
            key = {i+j+'px'}
          />
        );
      }
      jumpComponent.push(temp);
      this.jumpRef.push(tempRefs);
    }

    const growComponent = (
      <img
        src={require("./cake.png")}
        alt=""
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) scale(0.0)',
          width: '50px',
          height: '50px',
          zIndex: '20',
        }}
        ref = {img => this.growRef = img}
        key = {'grow'}
      />
    )

    return (
      <div className="App" >
        <header className="App-header" >
          <Container style={containerStyle}>
            <Button style={buttonStyle} onClick={() => this.slidetl.restart()} variant="outline-info">Slide</Button>
            <Button style={buttonStyle} onClick={() => this.filltl.restart()} variant="outline-info">Fill</Button>
            <Button style={buttonStyle} onClick={() => this.orbittl.restart()} variant="outline-info">Orbit</Button>
            <Button style={buttonStyle} onClick={() => this.raintl.restart()} variant="outline-info">Rain</Button>
            <Button style={buttonStyle} onClick={() => this.jumptl.restart()} variant="outline-info">Jump</Button>
            <Button style={buttonStyle} onClick={() => this.growtl.restart()} variant="outline-info">Grow</Button>
          </Container>
          {slideComponents}
          {fillComponent}
          {orbitComponents}
          {rainComponents}
          {jumpComponent}
          {growComponent}
        </header>
      </div>
    );
  }
}

export default App;
