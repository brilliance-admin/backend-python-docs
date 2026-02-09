class UserSessionTable(AdminTable):
    model = UserSession
    icon = "mdi-account-clock"
    columns = [
        "id", "ip_address", "country_code",
        "city", "device_type", "browser",
    ]
    search_columns = ["ip_address", "city"]
    sortable_columns = ["id", "started_at"]
