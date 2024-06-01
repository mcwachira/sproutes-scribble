import React from 'react';
import {redirect} from "next/navigation";

function DashboardPage() {
redirect("/dashboard/settings");
}

export default DashboardPage;