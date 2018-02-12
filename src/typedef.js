// @flow

export type Interview = {|
    _id: {
        $oid: string
    },
    fullName: string,
    birthDate: string,
    phoneNumber: string,
    interiewNotes: string
|};