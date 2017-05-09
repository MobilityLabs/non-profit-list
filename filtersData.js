// @flow
import type {FiltersData, Filters} from './client/types';

export const filtersData: FiltersData = {
  income_cd: {
    label: 'Income Amount ($)',
    filters: [
      {
        value: 1,
        label: '1 to 9,999'
      },
      {
        value: 2,
        label: '10,000 to 24,999'
      },
      {
        value: 3,
        label: '25,000 to 99,999'
      },
      {
        value: 4,
        label: '100,000 to 499,999'
      },
      {
        value: 5,
        label: '500,000 to 999,999'
      },
      {
        value: 6,
        label: '1,000,000 to 4,999,999'
      },
      {
        value: 7,
        label: '5,000,000 to 9,999,999'
      },
      {
        value: 8,
        label: '10,000,000 to 49,999,999'
      },
      {
        value: 9,
        label: '50,000,000 to greater'
      }
    ]
  },
  ntee_cd: {
    label: 'Primary Exempt Activity',
    filters: [
      {
        value: 'A',
        label: 'Arts, Culture and Humanities'
      },
      {
        value: 'B',
        label: 'Educational Institutions and Related Activities'
      },
      {
        value: 'C',
        label: 'Environmental Quality, Protection and Beautification'
      },
      {
        value: 'D',
        label: 'Animal-Related'
      },
      {
        value: 'E',
        label: 'Health – General and Rehabilitative'
      },
      {
        value: 'F',
        label: 'Mental Health, Crisis Intervention'
      },
      {
        value: 'G',
        label: 'Diseases, Disorders, Medical Disciplines'
      },
      {
        value: 'H',
        label: 'Medical Research'
      },
      {
        value: 'I',
        label: 'Crime, Legal-Related'
      },
      {
        value: 'J',
        label: 'Employment, Job-Related'
      },
      {
        value: 'K',
        label: 'Food, Agriculture and Nutrition'
      },
      {
        value: 'L',
        label: 'Housing, Shelter'
      },
      {
        value: 'M',
        label: 'Public Safety, Disaster Preparedness and Relief'
      },
      {
        value: 'N',
        label: 'Recreation, Sports, Leisure, Athletics'
      },
      {
        value: 'O',
        label: 'Youth Development'
      },
      {
        value: 'P',
        label: 'Human Services – Multipurpose and Other'
      },
      {
        value: 'Q',
        label: 'International, Foreign Affairs and National Security'
      },
      {
        value: 'R',
        label: 'Civil Rights, Social Action, Advocacy'
      },
      {
        value: 'S',
        label: 'Community Improvement, Capacity Building'
      },
      {
        value: 'T',
        label: 'Philanthropy, Voluntarism and Grantmaking Foundations'
      },
      {
        value: 'U',
        label: 'Science and Technology Research Institutes, Services'
      },
      {
        value: 'V',
        label: 'Social Science Research Institutes, Services'
      },
      {
        value: 'W',
        label: 'Public, Society Benefit – Multipurpose and Other'
      },
      {
        value: 'X',
        label: 'Religion-Related, Spiritual Development'
      },
      {
        value: 'Y',
        label: 'Mutual/Membership Benefit Organizations, Other'
      },
      {
        value: 'Z',
        label: 'Unknown'
      }
    ]
  },
  state: {
    label: 'State',
    filters: [
      {
        value: 'AK',
        label: 'Alaska'
      },
      {
        value: 'AL',
        label: 'Alabama'
      },
    ]
  },
};

export const defaultFilters: Filters = {
  income_cd: [],
  name: '',
  ntee_cd: [],
  order: {},
  ruling: '',
  state: [],
  tax_period: '',
};
