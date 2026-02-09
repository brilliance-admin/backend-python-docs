
class DasbhoardExample(schema.CategoryDashboard):

    async def get_data(self, data: DashboardData, user) -> DashboardContainer:
        chart_1 = ChartData(...)
        payment_payout_diff = SmallGraph(...)
        result = DashboardContainer(components=[
            chart_1,
            payment_payout_diff,
        ])
        return result
