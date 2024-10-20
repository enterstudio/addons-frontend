import React, { PropTypes } from 'react';
import { compose } from 'redux';

import translate from 'core/i18n/translate';
import Icon from 'ui/components/Icon';

import 'amo/css/AddonMeta.scss';

export class AddonMetaBase extends React.Component {
  static propTypes = {
    addon: PropTypes.object.isRequired,
    i18n: PropTypes.object.isRequired,
  }

  render() {
    const { addon, i18n } = this.props;
    const averageDailyUsers = addon.average_daily_users;
    const averageRating = addon.ratings.average;
    const addonReviewCount = addon.ratings.count;

    const userCount = i18n.sprintf(
      i18n.ngettext('%(total)s user', '%(total)s users', averageDailyUsers),
      { total: i18n.formatNumber(averageDailyUsers) },
    );
    let starCount;
    if (averageRating) {
      starCount = i18n.sprintf(
        i18n.gettext('%(averageRating)s out of 5'),
        { averageRating: i18n.formatNumber(averageRating) },
      );
    } else {
      starCount = i18n.gettext('Not yet rated');
    }
    let reviewCount;
    if (addonReviewCount) {
      reviewCount = i18n.sprintf(
        i18n.ngettext('%(total)s review', '%(total)s reviews', addonReviewCount),
        { total: i18n.formatNumber(addonReviewCount) },
      );
    } else {
      reviewCount = i18n.gettext('Not yet reviewed');
    }
    return (
      <div className="AddonMeta">
        <div className="AddonMeta-item AddonMeta-users">
          <h3 className="visually-hidden">{i18n.gettext('Used by')}</h3>
          <Icon className="AddonMeta-users-icon" name="user" />
          <p className="AddonMeta-text">{userCount}</p>
        </div>
        <div className="AddonMeta-item AddonMeta-ratings">
          <Icon className="AddonMeta-ratings-icon" name="star" />
          <p className="AddonMeta-text AddonMeta-star-count">
            {starCount}
          </p>
          <p className="AddonMeta-text AddonMeta-review-count">
            {reviewCount}
          </p>
        </div>
      </div>
    );
  }
}

export default compose(
  translate({ withRef: true }),
)(AddonMetaBase);
