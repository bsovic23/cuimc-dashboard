import { gql } from '@apollo/client';

export const QUERY_PX = gql`
    query Participants {
        participants {
        _id
        username
        pxFirstName
        pxLastName
        pxStatus
        pxAge
        pxStudy
        pxStudyDate
        createdAt
        comment {
            _id
            username
            createdAt
            commentType
            commentBody
        }
        }
    }
`;