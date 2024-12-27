import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { getSuggestedProfiles } from "../../services/firebase";

const Suggestions = ({ userId }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId);
      setProfiles(response);
    }
  }, [userId]);

  return !profiles ? (
    <Skeleton count={1} height={150} />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center jsutify-between">
        <p className='font-bold text-gray-base'>Suggestions for us</p>
      </div>
    </div>
  )
}

export default Suggestions;

Suggestions.propTypes = {
  userId: PropTypes.string,
};