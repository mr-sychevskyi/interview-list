// @flow

export type Interview = {|
    _id: {
        $oid: string
    },
    fullName: string,
    birthDate: string,
    phoneNumber: string,
    interviewNotes: string
|};
