const arrangeNumbers = (votedUni, voted) => {
    votedUni[0].reviews.forEach((review) => {
        if (review.name == voted.name) {
            review.subCtgs.forEach((subCtg) => {
                if (voted.subCtg.name == subCtg.name) {

                    // subCtg.total = 0
                    // subCtg.percentage = 0
                    // subCtg.rating = 0
                    
                    // review.total = 0
                    // review.percentage = 0
                    // review.rating = 0
                    subCtg.total += 1
                    review.total += 1

                    // subCtg percentage

                    if (subCtg.percentage == 0) {
                        subCtg.percentage = voted.subCtg.percentage
                    } else {
                        let prcTotal = subCtg.percentage * (subCtg.total-1)
                        prcTotal += voted.subCtg.percentage
                        subCtg.percentage = prcTotal / subCtg.total
                    }

                    // subCtg rating

                    if (subCtg.rating == 0) {
                        subCtg.rating = voted.subCtg.rating
                    } else {
                        let rtgTotal = subCtg.rating * (subCtg.total-1)
                        rtgTotal += voted.subCtg.rating
                        subCtg.rating = rtgTotal / subCtg.total
                    }

                    // review percentage

                    if (review.percentage == 0) {
                        review.percentage = subCtg.percentage
                    } else {
                        let prcTotal = review.percentage * (review.total-1)
                        prcTotal += voted.subCtg.percentage
                        review.percentage = prcTotal / review.total
                    }

                    // review rating

                    if (review.rating == 0) {
                        review.rating = subCtg.rating
                    } else {
                        let rtgTotal = review.rating * (review.total-1)
                        rtgTotal += voted.subCtg.rating
                        review.rating = rtgTotal / review.total
                    }
                }
                
                
            })
        }

    })
}

module.exports = arrangeNumbers