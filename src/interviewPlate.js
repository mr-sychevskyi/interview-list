// @flow

import {dataBaseUrl} from './interviewsList';

import type {Interview} from './typedef';
import templateCard from './templates/templateCard';

export default class InterviewPlate {
    interview: Interview;
    parent: HTMLElement;
    parentCurrentList: ?HTMLElement;
    id: string;
    card: HTMLFormElement;
    cardUrl: string;
    editMode: boolean;

    constructor(interview: Interview, parent: HTMLElement, parentCurrentList: ?HTMLElement) {
        this.interview = interview;
        this.parent = parent;
        this.parentCurrentList = parentCurrentList;

        this.id = interview._id.$oid;
        this.card = document.createElement('form');
        this.card.classList.add('interview-card');
        this.parent.appendChild(this.card);

        this.editMode = false;
        this.cardUrl = `https://api.mlab.com/api/1/databases/interview-data/collections/Interviews/${this.id}?apiKey=OC9zdRla3z_mJLnJolHefCGgrKx7MOlH`;
    }

    render() {
        if (this.id === 'createNew') {
            this.card.innerHTML = templateCard(this.interview, true);
            this.addNewCardListener();
        } else {
            this.card.innerHTML = templateCard(this.interview);
            this.addCardListeners();
        }
    }

    add() {
        fetch(dataBaseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.currentCardValues)
        }).then(res => res.json())
            .then(res => {
                if (this.parentCurrentList) {
                    const card = new InterviewPlate(res, this.parentCurrentList);
                    card.render();
                }
            })
            .catch(err => console.log(err));
    }

    destroy() {
        this.card.remove();
    }

    remove() {
        if (confirm('Are you sure?')) {
            fetch(this.cardUrl, {
                method: 'DELETE'
            }).then(() => this.destroy())
                .catch(err => console.log(err));
        }
    }

    update() {
        fetch(this.cardUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.currentCardValues)
        }).then(res => res.json())
            .catch(err => console.log(err));
    }

    erase() {
        [...this.card.querySelectorAll('.form-control')].forEach(item => {
            if (item instanceof HTMLInputElement) item.value = '';
            else if (item instanceof HTMLTextAreaElement) item.value = '';
        });
    }

    edit() {
        [...this.card.querySelectorAll('.interview-card__controls')].forEach(card => card.classList.toggle('hidden'));

        [...this.card.querySelectorAll('.form-control')].forEach(item => {
            if (item instanceof HTMLInputElement) item.readOnly = !this.editMode;
            else if (item instanceof HTMLTextAreaElement) item.readOnly = !this.editMode;
        })
    }

    cancel() {
        fetch(this.cardUrl)
            .then(res => res.json())
            .then(res => {
                this.card.innerHTML = templateCard(res);
                this.addCardListeners();
            });
    }

    get currentCardValues(): any {
        const fullName = this.card.querySelector('.fullname-input');
        const birthDate = this.card.querySelector('.date-input');
        const phoneNumber = this.card.querySelector('.phone-input');
        const interviewNotes = this.card.querySelector('.interviewNotes');

        if (fullName && fullName instanceof HTMLInputElement &&
            birthDate && birthDate instanceof HTMLInputElement &&
            phoneNumber && phoneNumber instanceof HTMLInputElement &&
            interviewNotes && interviewNotes instanceof HTMLTextAreaElement) {
            return {
                "fullName": fullName.value,
                "birthDate": birthDate.value,
                "phoneNumber": this.editMode ? phoneNumber.value.slice(1) : phoneNumber.value,
                "interviewNotes": interviewNotes.value
            }
        }
    }

    addCardListeners() {
        const btnEdit = this.card.querySelector('.btn-edit');
        const btnDelete = this.card.querySelector('.btn-delete');
        const btnAccept = this.card.querySelector('.btn-accept');
        const btnCancel = this.card.querySelector('.btn-cancel');

        if (btnEdit && btnDelete && btnAccept && btnCancel) {
            btnEdit.addEventListener('click', (e: MouseEvent) => {
                e.preventDefault();

                this.editMode = true;
                this.edit();
            });

            btnDelete.addEventListener('click', (e: MouseEvent) => {
                e.preventDefault();

                this.remove();
            });

            btnAccept.addEventListener('click', (e: MouseEvent) => {
                e.preventDefault();

                this.update();
                this.editMode = false;
                this.edit();
            });

            btnCancel.addEventListener('click', (e: MouseEvent) => {
                e.preventDefault();

                this.editMode = false;
                this.cancel();
            });
        }
    }

    addNewCardListener() {
        const btnAdd = this.card.querySelector('.btn-add');

        if (btnAdd) {
            btnAdd.addEventListener('click', (e: MouseEvent) => {
                e.preventDefault();

                this.add();
                this.erase();
            });
        }
    }
}
