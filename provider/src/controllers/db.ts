let VISITORS_DB_EMPTY = false;

export function setEmptyVisitorsDB(bool: boolean) {
  VISITORS_DB_EMPTY = bool;
}

export function getVisitorsFromDB() {
  if (VISITORS_DB_EMPTY) {
    return [];
  }

  return [
    {
      isNewInPeriod: true,
      currentVisits: 15,
      previousVisits: 2,
      daysActive: 4,
      fullName: 'Christopher Weibel',
      userName: 'christopher.weibel',
      userId: '5e3c90f5-048d-413b-bffb-0cb3bd44423d',
      requiredLicenseType: 'CONSUMER',
      effectiveLicenseType: 'CONSUMER',
      workflowParticipationFlag: false,
      firstActive: '2020-11-27',
      lastActive: '2022-11-24',
      isDeletedUser: false,
      isDisabledUser: false,
    },
    {
      isNewInPeriod: true,
      currentVisits: 15,
      previousVisits: 1,
      daysActive: 4,
      fullName: 'Ellie Kutsevol',
      userName: 'ellie.kutsevol',
      userId: '9640c457-daf3-4017-aad2-3982c7563aec',
      requiredLicenseType: 'AUTHOR',
      effectiveLicenseType: 'AUTHOR',
      workflowParticipationFlag: false,
      firstActive: '2021-01-15',
      lastActive: '2022-11-24',
      isDeletedUser: false,
      isDisabledUser: false,
    },
  ];
}
