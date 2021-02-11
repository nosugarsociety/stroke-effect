/* eslint-disable */
(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false;

  const sceneInfo = [
    {
      // Scene 0
      type: 'sticky',
      heightNum: 3, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      obj: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        pencilLogo: document.querySelector('#scroll-section-0 .pencil-logo'),
        pencil: document.querySelector('#scroll-section-0 .pencil'),
        ribbonPath: document.querySelector('.ribbon-path path'),
      },
      values: {
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageA_opacity_out: [1, 0, { start: 0.3, end: 0.4 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageA_translateY_out: [0, -20, { start: 0.3, end: 0.4 }],

        pencilLogo_width_in: [1000, 200, { start: 0.1, end: 0.4 }],
        pencilLogo_width_out: [200, 50, { start: 0.4, end: 0.8 }],
        pencilLogo_translateX_in: [-10, -20, { start: 0.2, end: 0.4 }],
        pencilLogo_translateX_out: [-20, -50, { start: 0.4, end: 0.8 }],
        pencilLogo_opacity_out: [1, 0, { start: 0.8, end: 0.9 }],

        path_dashoffset_in: [1401, 0, { start: 0.2, end: 0.4 }],
        path_dashoffset_out: [0, -1401, { start: 0.6, end: 0.8 }],
      },
    },
  ];

  const setLayout = () => {
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      }
      sceneInfo[
        i
      ].obj.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo[i].length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  };

  const calcValue = (values, currentYOffset) => {
    let rv;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (
        currentYOffset >= partScrollStart &&
        currentYOffset <= partScrollEnd
      ) {
        rv =
          ((currentYOffset - partScrollStart) / partScrollHeight) *
            (values[1] - values[0]) +
          values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = (values[1] - value[0]) * scrollRatio;
    }

    return rv;
  };

  const playAnimation = () => {
    const { obj } = sceneInfo[currentScene];
    const { values } = sceneInfo[currentScene];
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        if (scrollRatio < 0.25) {
          obj.messageA.style.opacity = calcValue(
            values.messageA_opacity_in,
            currentYOffset
          );
          obj.messageA.style.transform = `translate3d(0, ${calcValue(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          obj.messageA.style.opacity = calcValue(
            values.messageA_opacity_out,
            currentYOffset
          );
          obj.messageA.style.transform = `translate3d(0, ${calcValue(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.4) {
          obj.pencilLogo.style.width = `${calcValue(
            values.pencilLogo_width_in,
            currentYOffset
          )}vw`;

          obj.pencilLogo.style.transform = `translate3d(${calcValue(
            values.pencilLogo_translateX_in,
            currentYOffset
          )}%, -50%, 0)`;
        } else {
          obj.pencilLogo.style.width = `${calcValue(
            values.pencilLogo_width_out,
            currentYOffset
          )}vw`;
          obj.pencilLogo.style.transform = `translate3d(${calcValue(
            values.pencilLogo_translateX_out,
            currentYOffset
          )}%, -50%, 0})`;
        }

        if (scrollRatio < 0.5) {
          obj.ribbonPath.style.strokeDashoffset = calcValue(
            values.path_dashoffset_in,
            currentYOffset
          );
        } else {
          obj.ribbonPath.style.strokeDashoffset = calcValues(
            values.path_dashoffset_out,
            currentYOffset
          );
        }

        break;
    }
  };

  const scrollLoop = () => {
    enterNewScene = false;
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;

      if (currentScene === sceneInfo.length - 1) {
        document.body.classList.add('scroll-effect-end');
      }

      if (currentScene < sceneInfo.length - 1) {
        currentScene++;
      }
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    } else {
      document.body.classList.remove('scroll-effect-end');
    }

    if (yOffset < prevScrollHeight) {
      enterNewScene = true;
      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;
    playAnimation();
  };

  window.addEventListener('load', () => {
    document.body.classList.remove('before-load');
    setLayout();

    window.addEventListener('scroll', () => {
      yOffset = window.pageYOffset;
      scrollLoop();
    });
  });
})();
