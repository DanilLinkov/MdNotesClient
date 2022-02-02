import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

const Languages = ["en", "ko", "chi"];

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: true,
    whitelist: Languages,
    resources: {
      en: {
        translation: {
          title: "Title",
          description: "Description",
          save: "Save",
          remove: "Remove",
          gotomarkdown: "Go To Markdown",
          addnewnote: "Add new note",
          back: "Back",
          create: "Create",
          createanewsubject: "Create a new subject",
          editsubject: "Edit subject",
          cancel: "Cancel",
          update: "Update",
          home: "Home",
          logout: "Log out",
          edit: "Edit",
          gotonotes: "Go to notes",
          addnewsubject: "Add new subject",
          submit: "submit",
          content:
            "# This is a markdown file\n### To learn more about markdown syntax go to https://www.markdownguide.org/basic-syntax/",
        },
      },
      ko: {
        translation: {
          "title": "표제",
          "description": "기술",
          "save": "저장",
          "remove": "없애다",
          "gotomarkdown": "Markdown으로 이동",
          "addnewnote": "새 메모 추가",
          "back": "뒤",
          "create": "창조하다",
          "createanewsubject": "새로운 주제 만들기",
          "editsubject": "주제 수정",
          "cancel": "취소",
          "update": "최신 정보",
          "home": "집",
          "logout": "로그 아웃",
          "edit": "편집하다",
          "gotonotes": "메모로 이동",
          "addnewsubject": "새 주제 추가",
          "submit": "제출",
          "content": "# 이 파일은 markdown\n### 구문에 대해 자세히 알아 보려면 다음으로 이동하십시오. https://www.markdownguide.org/basic-syntax/"
      },
      },
      chi: {
        translation: {
          "title": "标题",
          "description": "描述",
          "save": "保存",
          "remove": "去掉",
          "gotomarkdown": "去 Markdown",
          "addnewnote": "添加新笔记",
          "back": "背部",
          "create": "创造",
          "createanewsubject": "创建一个新主题",
          "editsubject": "编辑主题",
          "cancel": "取消",
          "update": "更新资料",
          "home": "家",
          "logout": "登出",
          "edit": "编辑",
          "gotonotes": "转到笔记",
          "addnewsubject": "添加新主题",
          "submit": "提交",
          "content": "# 该文件是\n### 进一步了解其语法 https://www.markdownguide.org/basic-syntax/"
      }
      }
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
