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
        pencilLogo_width_in: [1000, 200, { start: 0.1, end: 0.4 }],
        path_dashoffset_in: [1401, 0, { start: 0.2, end: 0.4 }],
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

  const scrollLoop = () => {
    enterNewScene = false;
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    // if (yOffset < prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
    //   document.body.classList.remove('scroll-effect-end');
    // }

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
      console.log('yes');
      enterNewScene = true;
      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;
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
