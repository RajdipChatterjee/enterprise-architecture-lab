# Stage 0: Build Phase

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /app

COPY backend.csproj .

RUN dotnet restore

COPY . .

RUN dotnet publish -c Release -o /publish

# Stage 1: Runtime Phase

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

COPY --from=build /publish .

CMD ["dotnet", "backend.dll"]