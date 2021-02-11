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

  window.addEventListener('load', () => {
    document.body.classList.remove('before-load');
    setLayout();
  });
})();
