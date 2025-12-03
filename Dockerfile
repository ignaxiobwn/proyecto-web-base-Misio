# Serve static site with Nginx
FROM nginx:1.25-alpine

# Remove default config and add ours
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/site.conf

# Copy static website content
COPY web/ /usr/share/nginx/html/

# Healthcheck: ensure index loads
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O - http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
