// flow

import './style.styl';

import InterviewsList from './interviewsList';

window.addEventListener('load', () => {
    if (document.body) {
        const list = new InterviewsList(document.body);
        list.getList();
    }
});