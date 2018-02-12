// @flow

import type {Interview} from './typedef';

import templateList from './templates/templateList';
import InterviewPlate from './interviewPlate';

export const dataBaseUrl = 'https://api.mlab.com/api/1/databases/interview-data/collections/Interviews?apiKey=3W6HwsPsBuULjX6cc9ZUcdJvdp-r_ziv';

export default class InterviewsList {
    parent: HTMLElement;
    list: Array<Interview>;
    body: HTMLDivElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
        this.list = [];

        this.body = document.createElement('div');
        this.body.classList.add('component');
        this.parent.appendChild(this.body);
    }

    getList() {
        fetch(dataBaseUrl)
            .then(res => res.json())
            .then(res => {
                this.list = res;
                this.drawList();
            });
    }

    drawList() {
        if (this.body) {
            this.body.innerHTML = templateList(this.list);

            const parentCurrentList = this.body.querySelector('.interview-list__current');
            const parentNewCardList = this.body.querySelector('.interview-list__newcard');

            this.list.forEach((interview: Interview) => {
                if (parentCurrentList) {
                    const card = new InterviewPlate(interview, parentCurrentList);
                    card.render();
                }
            });

            const interviewForm: Interview = {
                "_id": {
                    "$oid": 'createNew'
                },
                "fullName": '',
                "birthDate": '',
                "phoneNumber": '',
                "interviewNotes": ''
            };

            if (parentNewCardList) {
                const cardNew = new InterviewPlate(interviewForm, parentNewCardList, parentCurrentList);
                cardNew.render();
            }
        }
    }
}