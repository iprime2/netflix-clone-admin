import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import './home.css'
import { userData } from '../../dummyData'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import { useMemo } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  )

  const [userStats, setUserStats] = useState()

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + 'users/stats',
          {
            headers: {
              token:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjdkODcwNGE5MmM1NmFhZmFlM2Y0YyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MDQ1NDk2NiwiZXhwIjoxNjgwODg2OTY2fQ.Ul8EKCreMLd43qpAV9dd1Btu1ZKeTkWXv1v3BkJJ5hY',
            },
          }
        )
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id
        })

        setUserStats(statsList)

        /*statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], 'New User': item.total },
          ])
        )*/
      } catch (error) {
        console.log(error)
      }
    }

    getStats()
  }, [])

  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart
        data={userData}
        title='User Analytics'
        grid
        dataKey='Active User'
      />
      <div className='homeWidgets'>
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
}
